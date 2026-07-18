interface BreadcrumbProps {
  items: { label: string; href: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2">
          {index > 0 && <span className="text-gray-400 dark:text-gray-600">/</span>}
          <a
            href={item.href}
            className={`
              hover:text-blue-600 dark:hover:text-blue-400 transition-colors
              ${index === items.length - 1 ? "text-gray-900 dark:text-white font-medium" : ""}
            `}
          >
            {item.label}
          </a>
        </div>
      ))}
    </nav>
  );
}
