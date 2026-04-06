import type {Access} from 'payload'

export const isAdmin: Access = ({req: {user}}) => {
	return user?.role === 'admin'
}

export const isAdminOrPublished: Access = ({req: {user}}) => {
	if (user?.role === 'admin') return true
	return {isPublished: {equals: true}}
}

export const anyone: Access = () => true
