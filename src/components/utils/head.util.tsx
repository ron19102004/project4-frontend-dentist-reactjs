import React from 'react'
import { Helmet } from 'react-helmet'
export interface IHeadProps {
    title: string,
    description?: string,
    author: string,
    urlImage: string,
    urlPageCurrent: string,
    themeColor?: string,
}
const HeadUtil: React.FC<IHeadProps> = ({
    title,
    description = "Default description",
    author,
    urlPageCurrent,
    urlImage,
    themeColor = "#ffffff",
}) => {
    return (
        <Helmet>
            <title>{title} - Nha Khoa Ron</title>
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
        </Helmet>
    )
}

export default HeadUtil
