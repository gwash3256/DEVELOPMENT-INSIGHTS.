interface ArticleBodyProps {
  content: string;
}

export default function ArticleBody({ content }: ArticleBodyProps) {
  // Parse markdown to HTML
  const parseMarkdown = (md: string): string => {
    let html = md;

    // Headers
    html = html.replace(/^### (.*?)$/gm, "<h3>$1</h3>");
    html = html.replace(/^## (.*?)$/gm, "<h2>$1</h2>");
    html = html.replace(/^# (.*?)$/gm, "<h1>$1</h1>");

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/__(.*?)__/g, "<strong>$1</strong>");

    // Italic
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    html = html.replace(/_(.*?)_/g, "<em>$1</em>");

    // Code blocks
    html = html.replace(
      /```(.*?)\n([\s\S]*?)```/g,
      "<pre><code class='language-$1'>$2</code></pre>"
    );

    // Inline code
    html = html.replace(/`(.*?)`/g, "<code>$1</code>");

    // Lists
    html = html.replace(/^\* (.*?)$/gm, "<li>$1</li>");
    html = html.replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>");

    // Line breaks and paragraphs
    html = html.split("\n\n").map((para) => {
      if (para.match(/^<[h|ul|ol|pre]/)) return para;
      return `<p>${para}</p>`;
    }).join("");

    return html;
  };

  const htmlContent = parseMarkdown(content);

  return (
    <article
      className="max-w-none prose prose-invert
        prose-headings:text-gray-900 dark:prose-headings:text-white
        prose-p:text-gray-700 dark:prose-p:text-gray-300
        prose-strong:text-gray-900 dark:prose-strong:text-white
        prose-em:text-gray-700 dark:prose-em:text-gray-300
        prose-code:bg-gray-100 dark:prose-code:bg-slate-800
        prose-code:text-red-600 dark:prose-code:text-red-400
        prose-pre:bg-gray-900 dark:prose-pre:bg-slate-950
        prose-pre:border prose-pre:border-gray-700
        prose-li:text-gray-700 dark:prose-li:text-gray-300
        prose-ul:my-4 prose-ul:pl-6
        prose-ol:my-4 prose-ol:pl-6"
      dangerouslySetInnerHTML={{
        __html: htmlContent,
      }}
      style={{
        lineHeight: "1.8",
      }}
    />
  );
}
