export interface IPost {
  title: string
  post: string
  welcomeScreen: boolean
  photo: string
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
  blogId: string
  blogTitle: string
  date: Date
  blogPhotoFileURL?: undefined | string
}
