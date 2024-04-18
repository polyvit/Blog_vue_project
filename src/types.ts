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
