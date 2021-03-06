import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

export default function Head({ title }) {

  React.useEffect(() => {
    const pageTitle = document.title
    const inactiveMessage = "😴 Zzz..."

    document.addEventListener("visibilitychange", function (event) {
      const isPageActive = !document.hidden

      if (!isPageActive) {
        document.title = inactiveMessage
      } else {
        document.title = pageTitle
      }
    })
  })

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author
          siteUrl
          description
        }
      }
    }
  `)

  const { siteMetadata } = data.site

  return (
    <Helmet
      htmlAttributes={{ lang: "en" }}
      titleTemplate={`${siteMetadata.title} \u2014 %s`}
      title={title}
      defer={false}
      meta={[
        {
          name: "description",
          content: siteMetadata.description
        },
        {
          name: "twitter:title",
          content: title
        },
        {
          name: "twitter:description",
          content: siteMetadata.description
        },
        {
          name: "twitter:creator",
          content: siteMetadata.author
        },
        {
          property: "og:title",
          content: title
        },
        {
          property: "og:description",
          content: siteMetadata.description
        },
        {
          property: "og:type",
          content: "website"
        },
        {
          property: "og:image",
          content: `${siteMetadata.siteUrl}/og-image.png`
        }
      ]}
    />
  )
}