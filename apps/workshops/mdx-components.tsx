import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Marker } from "./components/marker";
import { PageSection } from "./components/page-section";
import React from "react";
import { createHighlighter, Highlighter } from "shiki";
import theme from "./app/syntax-theme.json";

function getTextContent(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (React.isValidElement(node)) {
    const element = node as React.ReactElement<{ children?: ReactNode }>;
    if (element.props.children) {
      return getTextContent(element.props.children);
    }
  }
  return "";
}

let highlighterInstance: Highlighter | null = null;

async function getHighlighter() {
  if (!highlighterInstance) {
    highlighterInstance = await createHighlighter({
      themes: [theme as any],
      langs: ["javascript", "typescript", "jsx", "tsx"],
    });
  }
  return highlighterInstance;
}

export async function Code({
  children,
  ...props
}: ComponentPropsWithoutRef<"code">) {
  let lang = "typescript";

  if (typeof children === "string" && children.startsWith("// ")) {
    let firstLine = children.split("\n")[0];
    let langMatch = firstLine?.match(/^\/\/ lang: (\w+)/);
    if (langMatch) {
      lang = langMatch[1]!;
      children = children.split("\n").slice(1).join("\n");
    }
  }

  let highlighter = await getHighlighter();

  let html = highlighter.codeToHtml(getTextContent(children), {
    lang,
    theme: theme.name,
  });

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export function useMDXComponents() {
  return {
    Marker,
    PageSection,
    code: Code,
  };
}
