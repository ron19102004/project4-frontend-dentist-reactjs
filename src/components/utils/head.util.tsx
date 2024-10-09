import React from 'react'
import { Helmet } from 'react-helmet'
export interface IHeadProps {
    title: string,
    description?: string,
    author: string,
    urlImage: string,
    urlPageCurrent: string,
    themeColor?: string,
    icon: string
}
const HeadUtil: React.FC<IHeadProps> = ({
    title,
    description = "Default description",
    author,
    urlPageCurrent,
    urlImage,
    themeColor = "#ffffff",
    icon
}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta charSet='UTF-8' />
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="author" content={author} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={urlImage ?? ""} />
            <meta property="og:url" content={urlPageCurrent ?? ""} />
            <meta property="og:type" content="website" />

            <meta name="theme-color" content={themeColor} />

            <link rel="icon" href={icon} type="image/png" />
        </Helmet>
    )
}

export default HeadUtil
