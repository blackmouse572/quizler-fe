import { ScrollArea } from "@/components/ui/scroll-area"
import { TDocLink, navigationLink } from "./side-bar-option"
import { cn } from "@/lib/utils"
import Link from "next/link"

type Props = {
  className?: string
}

const DocSideBar = ({ className }: Props) => {
  const renderChildLink = (link: TDocLink) => {
    return (
      <Link className="hover:underline" href={link.link}>
        {link.title}
      </Link>
    )
  }

  const renderSectionDocsLink = (link: TDocLink) => {
    return (
      <div key={link.link} className={cn("font-bold")}>
        {link.title}
        <div className="font-normal">
          {link.children?.map((child: TDocLink) => renderChildLink(child))}
        </div>
      </div>
    )
  }
  return (
    <ScrollArea className={cn("", className)}>
      <div className="space-y-2 p-4 pl-12">
        {navigationLink.map((link) => renderSectionDocsLink(link))}
      </div>
    </ScrollArea>
  )
}

export default DocSideBar
