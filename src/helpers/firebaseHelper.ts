
import { getAuth } from 'firebase-admin/auth'

const auth = getAuth()


async function getUserFromIdToken(idToken: string) {
    try {
        const result = await auth.verifyIdToken(idToken)
        return result
    }
    catch (err) {
        return null
    }
}

export { getUserFromIdToken }