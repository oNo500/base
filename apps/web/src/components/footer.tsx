import { Container } from '@/components/container'
import { env } from '@/config/env'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container>
        <div className="col-start-1 col-end-9 md:col-end-3">
          <p className="text-xs text-muted-foreground">
            {'© '}
            {new Date().getFullYear()}
            {' '}
            {env.NEXT_PUBLIC_APP_NAME}
          </p>
        </div>
      </Container>
    </footer>
  )
}
