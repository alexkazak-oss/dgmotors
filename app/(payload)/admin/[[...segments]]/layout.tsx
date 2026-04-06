/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'
import { serverFunction } from '../actions'
import { importMap } from '../importMap.js'

export { metadata } from '@payloadcms/next/layouts'

type LayoutArgs = {
	children: React.ReactNode
}

const Layout = ({ children }: LayoutArgs) =>
	RootLayout({ children, config, importMap, serverFunction })

export default Layout
