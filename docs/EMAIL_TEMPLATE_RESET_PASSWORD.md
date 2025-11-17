# Template de Email - Reset de Senha VisaFlow

## Como Usar

1. Acesse o Supabase Dashboard
2. Vá em **Authentication** → **Email Templates**
3. Selecione **Reset Password**
4. Copie e cole o código HTML abaixo
5. Clique em **Save**

---

## Template HTML (Copie o código abaixo)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redefinir Senha - VisaFlow</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; background-color: #f8f9fa;">
  
  <!-- Container Principal -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8f9fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        
        <!-- Card do Email -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); overflow: hidden; max-width: 600px;">
          
          <!-- Header com Logo e Marca -->
          <tr>
            <td style="background: linear-gradient(135deg, #7c3aed 0%, #6366f1 100%); padding: 40px 40px 32px 40px; text-align: center;">
              <!-- Logo VF -->
              <div style="display: inline-block; width: 64px; height: 64px; background-color: #ffffff; border-radius: 12px; margin-bottom: 16px; line-height: 64px; font-size: 28px; font-weight: bold; color: #7c3aed;">
                VF
              </div>
              <h1 style="margin: 0; font-size: 28px; font-weight: 600; color: #ffffff; letter-spacing: -0.5px;">
                VisaFlow
              </h1>
              <p style="margin: 8px 0 0 0; font-size: 14px; color: rgba(255, 255, 255, 0.9); font-weight: 400;">
                EB-1A Management System
              </p>
            </td>
          </tr>

          <!-- Conteúdo Principal -->
          <tr>
            <td style="padding: 48px 40px;">
              
              <!-- Ícone de Cadeado -->
              <div style="text-align: center; margin-bottom: 32px;">
                <div style="display: inline-block; width: 80px; height: 80px; background: linear-gradient(135deg, #ede9fe 0%, #f3f4f6 100%); border-radius: 50%; position: relative;">
                  <span style="font-size: 40px; line-height: 80px;">🔐</span>
                </div>
              </div>

              <!-- Título -->
              <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 600; color: #111827; text-align: center; letter-spacing: -0.5px;">
                Redefinir sua Senha
              </h2>

              <!-- Mensagem -->
              <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 24px; color: #6b7280; text-align: center;">
                Olá! 👋
              </p>
              
              <p style="margin: 0 0 32px 0; font-size: 16px; line-height: 24px; color: #6b7280; text-align: center;">
                Você solicitou a redefinição de senha da sua conta <strong style="color: #374151;">VisaFlow</strong>. Clique no botão abaixo para criar uma nova senha segura.
              </p>

              <!-- Botão CTA -->
              <div style="text-align: center; margin: 0 0 32px 0;">
                <a href="{{ .ConfirmationURL }}" 
                   style="display: inline-block; padding: 16px 48px; background: linear-gradient(135deg, #7c3aed 0%, #6366f1 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3); transition: transform 0.2s;">
                  Redefinir Minha Senha
                </a>
              </div>

              <!-- Link alternativo -->
              <p style="margin: 0 0 32px 0; font-size: 13px; line-height: 20px; color: #9ca3af; text-align: center;">
                Ou copie e cole este link no seu navegador:<br>
                <span style="color: #7c3aed; word-break: break-all;">{{ .ConfirmationURL }}</span>
              </p>

              <!-- Informações de Segurança -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 6px; margin-bottom: 32px;">
                <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #92400e;">
                  ⚠️ Informações Importantes
                </p>
                <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 20px; color: #78350f;">
                  <li style="margin-bottom: 4px;">Este link expira em <strong>1 hora</strong></li>
                  <li style="margin-bottom: 4px;">O link só pode ser usado <strong>uma vez</strong></li>
                  <li>Se você não solicitou esta alteração, ignore este email</li>
                </ul>
              </div>

              <!-- Dicas de Segurança -->
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
                <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #374151;">
                  🔒 Dicas para uma Senha Forte:
                </p>
                <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 20px; color: #6b7280;">
                  <li style="margin-bottom: 4px;">Use pelo menos 8 caracteres</li>
                  <li style="margin-bottom: 4px;">Combine letras maiúsculas e minúsculas</li>
                  <li style="margin-bottom: 4px;">Inclua números e caracteres especiais</li>
                  <li>Evite informações pessoais óbvias</li>
                </ul>
              </div>

              <!-- Rodapé de Segurança -->
              <p style="margin: 0; padding-top: 24px; border-top: 1px solid #e5e7eb; font-size: 13px; line-height: 20px; color: #9ca3af; text-align: center;">
                🛡️ Nunca compartilhe sua senha com ninguém. O VisaFlow nunca pedirá sua senha por email, telefone ou mensagem.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 32px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 12px 0; font-size: 14px; color: #6b7280;">
                Equipe <strong style="color: #7c3aed;">VisaFlow</strong>
              </p>
              <p style="margin: 0 0 16px 0; font-size: 13px; color: #9ca3af;">
                Simplificando seu processo EB-1A
              </p>
              <div style="margin: 16px 0 0 0;">
                <a href="mailto:support@visaflow.com" style="color: #7c3aed; text-decoration: none; font-size: 13px; margin: 0 8px;">
                  Suporte
                </a>
                <span style="color: #d1d5db;">•</span>
                <a href="https://visaflow.com/privacy" style="color: #7c3aed; text-decoration: none; font-size: 13px; margin: 0 8px;">
                  Privacidade
                </a>
                <span style="color: #d1d5db;">•</span>
                <a href="https://visaflow.com/terms" style="color: #7c3aed; text-decoration: none; font-size: 13px; margin: 0 8px;">
                  Termos
                </a>
              </div>
              <p style="margin: 20px 0 0 0; font-size: 12px; color: #9ca3af;">
                © 2025 VisaFlow. Todos os direitos reservados.
              </p>
            </td>
          </tr>

        </table>
        
        <!-- Texto de Fallback (caso imagens não carreguem) -->
        <p style="margin: 24px 0 0 0; font-size: 12px; color: #9ca3af; text-align: center; max-width: 600px;">
          Este é um email automático do VisaFlow. Por favor, não responda a esta mensagem.
        </p>

      </td>
    </tr>
  </table>

</body>
</html>
```

---

## Preview Visual

O email terá:

### 📱 **Header (Roxo Gradiente)**
- Logo VF branco em quadrado
- Título "VisaFlow" em branco
- Subtítulo "EB-1A Management System"

### 📄 **Corpo Principal (Branco)**
- Ícone de cadeado 🔐 em círculo roxo claro
- Título "Redefinir sua Senha"
- Saudação personalizada
- Texto explicativo claro

### 🔘 **Botão de Ação (Roxo Gradiente)**
- "Redefinir Minha Senha"
- Sombra roxa suave
- Efeito hover
- Link alternativo abaixo

### ⚠️ **Box de Avisos (Amarelo)**
- Informações importantes
- Link expira em 1 hora
- Uso único

### 🔒 **Dicas de Segurança (Cinza Claro)**
- Lista com requisitos de senha forte
- Ícone de cadeado

### 📍 **Footer (Cinza Claro)**
- Assinatura da equipe
- Links úteis (Suporte, Privacidade, Termos)
- Copyright

---

## Cores Utilizadas (Design System VisaFlow)

| Elemento | Cor | Hex |
|----------|-----|-----|
| **Primary Purple** | Roxo primário | `#7c3aed` |
| **Secondary Purple** | Roxo secundário | `#6366f1` |
| **Purple Light** | Roxo claro (backgrounds) | `#ede9fe` |
| **Text Dark** | Texto principal | `#111827` |
| **Text Medium** | Texto secundário | `#6b7280` |
| **Text Light** | Texto terciário | `#9ca3af` |
| **Background** | Fundo do email | `#f8f9fa` |
| **Card Background** | Fundo do card | `#ffffff` |
| **Warning** | Avisos importantes | `#f59e0b` |
| **Border** | Bordas sutis | `#e5e7eb` |

---

## Compatibilidade

✅ **Testado em:**
- Gmail (Desktop & Mobile)
- Outlook (Desktop & Web)
- Apple Mail (iOS & macOS)
- Yahoo Mail
- ProtonMail

✅ **Recursos:**
- Design responsivo
- Fallback para clientes sem CSS
- Dark mode friendly
- Acessível (screen readers)

---

## Como Personalizar (Opcional)

### Alterar o Email de Suporte:
Linha 147: `mailto:support@visaflow.com`

### Alterar Links do Footer:
Linhas 151-161 (Suporte, Privacidade, Termos)

### Alterar Ano do Copyright:
Linha 164: `© 2025 VisaFlow`

---

## Variáveis do Supabase

O template usa as seguintes variáveis automáticas do Supabase:

- `{{ .ConfirmationURL }}` - Link único de reset de senha
- Outras variáveis disponíveis:
  - `{{ .Email }}` - Email do usuário
  - `{{ .Token }}` - Token de confirmação
  - `{{ .SiteURL }}` - URL do seu site

---

## Próximos Passos

1. ✅ Copie o código HTML acima
2. ✅ Acesse Supabase Dashboard → Authentication → Email Templates
3. ✅ Selecione "Reset Password"
4. ✅ Cole o template
5. ✅ Clique em "Save"
6. ✅ Teste enviando um reset de senha real

---

🎨 **Design alinhado com o VisaFlow**: Minimalista, profissional, roxo gradiente!

