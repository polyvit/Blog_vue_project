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
