'use client'

import { useCallback, useState } from 'react'

interface SyncResult {
	found: number
	created: number
	updated: number
	skipped: number
	errors: string[]
}

type SyncState =
	| { status: 'idle' }
	| { status: 'loading' }
	| { status: 'success'; result: SyncResult }
	| { status: 'error'; message: string }

export function S3SyncButton() {
	const [state, setState] = useState<SyncState>({ status: 'idle' })

	const handleSync = useCallback(async () => {
		setState({ status: 'loading' })

		try {
			const res = await fetch('/api/s3-sync', {
				method: 'POST',
				credentials: 'include',
			})

			if (!res.ok) {
				const body = (await res.json().catch(() => null)) as {
					error?: string
				} | null
				throw new Error(body?.error || `HTTP ${res.status}`)
			}

			const result = (await res.json()) as SyncResult
			setState({ status: 'success', result })
		} catch (err) {
			const message =
				err instanceof Error ? err.message : 'Неизвестная ошибка'
			setState({ status: 'error', message })
		}
	}, [])

	return (
		<div style={{ marginBottom: '1.5rem' }}>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '1rem',
					flexWrap: 'wrap',
				}}
			>
				<button
					type="button"
					onClick={handleSync}
					disabled={state.status === 'loading'}
					className="btn btn--style-primary btn--size-medium"
					style={{ whiteSpace: 'nowrap' }}
				>
					{state.status === 'loading'
						? 'Синхронизация...'
						: 'Синхронизировать с S3'}
				</button>

				{state.status === 'success' && (
					<span
						style={{
							fontSize: '0.875rem',
							color: 'var(--theme-success-500, #22c55e)',
						}}
					>
						Найдено: {state.result.found} · Создано:{' '}
						{state.result.created} · Обновлено:{' '}
						{state.result.updated} · Пропущено:{' '}
						{state.result.skipped}
						{state.result.errors.length > 0 &&
							` · Ошибки: ${state.result.errors.length}`}
					</span>
				)}

				{state.status === 'error' && (
					<span
						style={{
							fontSize: '0.875rem',
							color: 'var(--theme-error-500, #ef4444)',
						}}
					>
						Ошибка: {state.message}
					</span>
				)}
			</div>

			{state.status === 'success' && state.result.errors.length > 0 && (
				<details style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
					<summary style={{ cursor: 'pointer', color: 'var(--theme-error-500, #ef4444)' }}>
						Показать ошибки ({state.result.errors.length})
					</summary>
					<ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
						{state.result.errors.map((e, i) => (
							<li key={i}>{e}</li>
						))}
					</ul>
				</details>
			)}
		</div>
	)
}
