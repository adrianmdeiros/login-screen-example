'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState, useEffect } from 'react'
import { changePassword } from '../../actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface ChangePasswordProps {
  token: string
}

export function ChangePassword({ token }: ChangePasswordProps) {
  const [state, formAction, pending] = useActionState(changePassword, undefined)
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message)
      setTimeout(() => {
        router.push('/')
      }, 1600)
    }
  }, [state?.success])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Redefinir Senha</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {state?.success === false && (
            <p className="text-yellow-500 font-semibold text-sm">{state.message}</p>
          )}
          <div className="space-y-2">
            <Label htmlFor="password">Nova Senha</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              disabled={pending}
            />
            {state?.errors?.password && (
              <p className="text-sm font-medium text-yellow-500">{state.errors.password[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              disabled={pending}
            />
            {state?.errors?.confirmPassword && (
              <p className="text-sm font-medium text-yellow-500">{state.errors.confirmPassword[0]}</p>
            )}
          </div>
          <input type="hidden" name="token" value={token} />
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Alterando...' : 'Alterar Senha'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
