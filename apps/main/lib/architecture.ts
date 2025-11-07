import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const archDirectory = path.join(process.cwd(), 'content/architecture')

// Type definitions matching your actual YAML structure
export interface KelpRoot {
  kelp_architecture: {
    version: string
    description: string
  }
  forests: Forest[]
}

export interface Forest {
  id: string
  label: string
  synonyms?: string[]
  scope: string
  theoretical_foundations?: string[]
  key_disciplines?: string[]
  academic_description?: string
  clinical_description?: string
  fields?: Field[]
}

export interface Field {
  id: string
  label: string
  forest: string
  forest_id: string
  synonyms?: string[]
  scope: string
  parent_scope_inheritance?: string
  emergence?: string
  boundary_interfaces?: string[]
  clusters?: Cluster[]
}

export interface Cluster {
  id: string
  label: string
  field: string
  field_id: string
  synonyms?: string[]
  scope: string
  parent_scope_inheritance?: string
  emergence?: string
  theoretical_foundations?: string[]
  anchors?: Anchor[]
}

export interface Anchor {
  id: string
  label: string
  cluster: string
  cluster_id: string
  synonyms?: string[]
  scope?: string
  definition?: string
  examples?: string[]
  theoretical_foundations?: string[]
  related_concepts?: string[]
  polar_pair?: {
    anchor_id: string
    relationship: string
  }
}

// Cache for parsed data
let cachedData: KelpRoot | null = null

// Parse all YAML files and build hierarchy
export function getArchitectureData(): KelpRoot {
  if (cachedData) return cachedData

  // 1. Load root (kelp.yaml)
  const rootPath = path.join(archDirectory, 'kelp.yaml')
  const rootData = yaml.load(fs.readFileSync(rootPath, 'utf8')) as KelpRoot

  // 2. For each forest, load its fields
  rootData.forests = rootData.forests.map((forest) => {
    const fieldsFile = findFile(`${forest.id.toUpperCase()}_fields_`)
    if (fieldsFile) {
      const fieldsData = yaml.load(
        fs.readFileSync(path.join(archDirectory, fieldsFile), 'utf8')
      ) as { fields: Field[] }
      forest.fields = fieldsData.fields

      // 3. For each field, load its clusters
      forest.fields = forest.fields.map((field) => {
        const clustersFile = findFile(`${field.id.toUpperCase()}_clusters_`)
        if (clustersFile) {
          const clustersData = yaml.load(
            fs.readFileSync(path.join(archDirectory, clustersFile), 'utf8')
          ) as { clusters: Cluster[] }
          field.clusters = clustersData.clusters

          // 4. For each cluster, load its anchors
          field.clusters = field.clusters.map((cluster) => {
            const anchorsFile = findFile(`${cluster.id.toUpperCase()}_anchors_`)
            if (anchorsFile) {
              const anchorsData = yaml.load(
                fs.readFileSync(path.join(archDirectory, anchorsFile), 'utf8')
              ) as { anchors: Anchor[] }
              cluster.anchors = anchorsData.anchors
            }
            return cluster
          })
        }
        return field
      })
    }
    return forest
  })

  cachedData = rootData
  return rootData
}

// Helper: Find file by prefix (ignores timestamp, case insensitive)
function findFile(prefix: string): string | null {
  const files = fs.readdirSync(archDirectory)
  const match = files.find((f) => 
    f.toUpperCase().startsWith(prefix.toUpperCase()) && f.endsWith('.yaml')
  )
  return match || null
}

// Navigation helpers
export function getForestById(forestId: string): Forest | undefined {
  const data = getArchitectureData()
  return data.forests.find((f) => f.id.toLowerCase() === forestId.toLowerCase())
}

export function getFieldById(fieldId: string): Field | undefined {
  const data = getArchitectureData()
  for (const forest of data.forests) {
    const field = forest.fields?.find((f) => f.id.toLowerCase() === fieldId.toLowerCase())
    if (field) return field
  }
  return undefined
}

export function getClusterById(clusterId: string): Cluster | undefined {
  const data = getArchitectureData()
  for (const forest of data.forests) {
    for (const field of forest.fields || []) {
      const cluster = field.clusters?.find((c) => c.id.toLowerCase() === clusterId.toLowerCase())
      if (cluster) return cluster
    }
  }
  return undefined
}

export function getAnchorById(anchorId: string): Anchor | undefined {
  const data = getArchitectureData()
  for (const forest of data.forests) {
    for (const field of forest.fields || []) {
      for (const cluster of field.clusters || []) {
        const anchor = cluster.anchors?.find((a) => a.id.toLowerCase() === anchorId.toLowerCase())
        if (anchor) return anchor
      }
    }
  }
  return undefined
}

// Get breadcrumb path for any item
export function getBreadcrumbs(itemId: string): Array<{ id: string; name: string; href: string }> {
  const data = getArchitectureData()
  const breadcrumbs: Array<{ id: string; name: string; href: string }> = [
    { id: 'root', name: 'Kelp Architecture', href: '/architecture' },
  ]

  // Normalize ID for comparison
  const normalizedId = itemId.toLowerCase()
  const parts = normalizedId.split('-')

  if (parts.length === 1) {
    // Forest
    const forest = getForestById(normalizedId)
    if (forest) {
      breadcrumbs.push({ id: forest.id, name: forest.label, href: `/architecture/${forest.id}` })
    }
  } else if (parts.length === 2) {
    // Field
    const field = getFieldById(normalizedId)
    if (field) {
      const forest = getForestById(parts[0])
      if (forest) {
        breadcrumbs.push({ id: forest.id, name: forest.label, href: `/architecture/${forest.id}` })
      }
      breadcrumbs.push({ id: field.id, name: field.label, href: `/architecture/${field.id}` })
    }
  } else if (parts.length === 3) {
    // Cluster
    const cluster = getClusterById(normalizedId)
    if (cluster) {
      const fieldId = `${parts[0]}-${parts[1]}`
      const field = getFieldById(fieldId)
      const forest = getForestById(parts[0])
      if (forest) {
        breadcrumbs.push({ id: forest.id, name: forest.label, href: `/architecture/${forest.id}` })
      }
      if (field) {
        breadcrumbs.push({ id: field.id, name: field.label, href: `/architecture/${fieldId}` })
      }
      breadcrumbs.push({ id: cluster.id, name: cluster.label, href: `/architecture/${cluster.id}` })
    }
  } else if (parts.length >= 4) {
    // Anchor
    const anchor = getAnchorById(normalizedId)
    if (anchor) {
      const clusterId = `${parts[0]}-${parts[1]}-${parts[2]}`
      const fieldId = `${parts[0]}-${parts[1]}`
      const cluster = getClusterById(clusterId)
      const field = getFieldById(fieldId)
      const forest = getForestById(parts[0])
      if (forest) {
        breadcrumbs.push({ id: forest.id, name: forest.label, href: `/architecture/${forest.id}` })
      }
      if (field) {
        breadcrumbs.push({ id: field.id, name: field.label, href: `/architecture/${fieldId}` })
      }
      if (cluster) {
        breadcrumbs.push({
          id: cluster.id,
          name: cluster.label,
          href: `/architecture/${clusterId}`,
        })
      }
      breadcrumbs.push({ id: anchor.id, name: anchor.label, href: `/architecture/${anchor.id}` })
    }
  }

  return breadcrumbs
}