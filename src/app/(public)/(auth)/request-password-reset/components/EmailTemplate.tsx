import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface EmailTemplateProps {
  resetUrl: string;
}

export function EmailTemplate({ resetUrl }: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Link para redefinição de senha</Preview>
      <Body style={{ backgroundColor: '#f6f9fc', padding: '50px 0' }}>
        <Container>
          <Section style={{ backgroundColor: '#ffffff', padding: '35px', borderRadius: '5px' }}>
            <Heading style={{ color: '#333', fontSize: '24px', textAlign: 'center' }}>
              Redefinição de Senha
            </Heading>
            <Text style={{ color: '#666', fontSize: '16px', lineHeight: '24px' }}>
              Foi solicitada uma redefinição de senha para sua conta.
            </Text>
            <Text style={{ color: '#666', fontSize: '16px', lineHeight: '24px' }}>
              Para redefinir sua senha, clique no botão abaixo:
            </Text>
            <Button
              href={resetUrl}
              style={{
                backgroundColor: '#000',
                borderRadius: '5px',
                color: '#fff',
                display: 'block',
                margin: '20px auto',
                padding: '12px 20px',
                textDecoration: 'none',
              }}
            >
              Redefinir Senha
            </Button>
            <Text style={{ color: '#999', fontSize: '14px', marginTop: '30px' }}>
              Se você não solicitou uma redefinição de senha, por favor ignore este email.
              Este link expirará em 30 minutos.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}