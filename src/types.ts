import type { StringLiteralLike } from 'typescript'

export interface IPost {
  title: string
  blogPost?: string
  blogHTML?: string
  welcomeScreen?: boolean
  photo?: string
  blogCoverPhoto?: string
}

export interface IBlogCard {
  blogTitle: string
  blogCoverPhoto: string
  blogDate: string
}

export interface IAuthLayoutProps {
  linkTitle: string
  route: string
  title: string
}

export interface IProfile {
  profileEmail: null | string
  profileFirstName: null | string
  profileLastName: null | string
  profileUsername: null | string
  profileId: null | string
  profileInitials: null | string
}

export interface IBlog {
  blogPosts: IBlogPost[]
  blogHTML: string
  blogTitle: string
  blogPhotoName: string
  blogPhotoFileURL: undefined | string
  blogPhotoPreview: null | boolean
}

export interface IBlogPost {
  blogCoverPhoto: string
  blogCoverPhotoName: string
  blogHTML: string
  blogID: string
  blogTitle: string
  date: Date
  profileId: string
}
