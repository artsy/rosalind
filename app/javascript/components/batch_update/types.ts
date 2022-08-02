export type Gene = {
  name: string
  id: string
}

export type Tag = {
  name: string
  id: string
}

export type Artist = {
  name: string
  id: string
}

export type Artwork = {
  name: string
  id: string
  genes: string[]
  tags: string[]
}

export type Notice = {
  id: string
  message: string
  isError: boolean
}
