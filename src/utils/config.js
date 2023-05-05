export const Server = {
    endpoint : import.meta.env.VITE_APP_ENDPOINT,
    project: import.meta.env.VITE_APP_PROJECT,
    AuthCollectionID: import.meta.env.VITE_APP_AUTH_COLLECTION_ID,
    collectionID : import.meta.env.VITE_APP_COLLECTION_ID,
    database: import.meta.env.VITE_APP_DATABASE_ID.toString(),
}