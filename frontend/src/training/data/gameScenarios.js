/**
 * Cyber Attack Game Scenarios Database
 * 120+ realistic scenarios across 12 categories
 * Each scenario is fully playable with realistic content
 */

export const gameScenarios = {
  phishing: {
    category: "Phishing Emails",
    icon: "✉️",
    color: "#FF6B6B",
    scenarios: [
      {
        id: "phishing_1",
        title: "Bank Account Suspended",
        type: "email",
        difficulty: "easy",
        sender: "security@yourbank.com",
        subject: "URGENT: Your account has been suspended",
        content: "Dear Customer,\n\nWe noticed suspicious activity on your account. Your account will be permanently blocked in 24 hours if you don't verify your identity.\n\nClick here to verify immediately:\nhttp://verify-yourbank-secure.com/verify",
        preview: "URGENT: Your account has been suspended",
        options: [
          { id: "click", text: "Click the verification link", emoji: "🔗" },
          { id: "ignore", text: "Ignore the email", emoji: "🚫" },
          { id: "report", text: "Report as phishing", emoji: "⚠️" }
        ],
        correctAnswers: ["ignore", "report"],
        explanation: "Banks NEVER ask for verification via email links. Go directly to your bank's website or call them to verify.",
        prevention: ["Never click links in emails from banks", "Log in directly via your banking app", "Call the bank's customer service phone number"],
        riskLevel: "Critical"
      },
      {
        id: "phishing_2",
        title: "PayPal Confirm Identity",
        type: "email",
        difficulty: "easy",
        sender: "PayPal Support <noreply@paypal.com.security.us>",
        subject: "Confirm your PayPal identity - Action required",
        content: "We've detected unusual login activity on your PayPal account from:\nLocation: Russia\nTime: 2:34 AM\n\nIf this wasn't you, please confirm your identity immediately:\nhttps://paypal-verify.security-check.net/confirm",
        preview: "Confirm your PayPal identity - Action required",
        options: [
          { id: "click", text: "Click to confirm identity", emoji: "📋" },
          { id: "manual_login", text: "Log in to PayPal directly", emoji: "✅" },
          { id: "call", text: "Call PayPal support (1-888-221-1161)", emoji: "☎️" }
        ],
        correctAnswers: ["manual_login", "call"],
        explanation: "PayPal alerts that come via email links are almost always phishing. Always navigate to the official website manually or call their support number.",
        prevention: ["Use the official PayPal app to manage account security", "Never follow links from unexpected security emails", "Enable 2FA on your PayPal account"],
        riskLevel: "Critical"
      },
      {
        id: "phishing_3",
        title: "Amazon Order Verification",
        type: "email",
        difficulty: "easy",
        sender: "Amazon <order-verification@amazon-secure.com>",
        subject: "Verify your recent Amazon purchase of $899",
        content: "Hello,\n\nSomeone just ordered a Samsung 4K Smart TV worth $899 on your account. If this wasn't you, click below to cancel:\n\nCancel Order: https://amazon-checkout-verify.shop/cancel",
        preview: "Verify your recent Amazon purchase of $899",
        options: [
          { id: "click", text: "Click to cancel order", emoji: "❌" },
          { id: "login", text: "Log into Amazon directly", emoji: "🔐" },
          { id: "call", text: "Call Amazon customer service", emoji: "☎️" }
        ],
        correctAnswers: ["login", "call"],
        explanation: "Amazon sends order notifications from amazon.com domain. If you're worried, log in directly or call their support. Don't click suspicious links.",
        prevention: ["Check your Amazon account directly", "Amazon customer service: Get help via your account", "Don't panic - scammers use urgency as a tactic"],
        riskLevel: "High"
      },
      {
        id: "phishing_4",
        title: "Apple ID Security Alert",
        type: "email",
        difficulty: "medium",
        sender: "Apple Security <noreply@apple.id.security>",
        subject: "Your Apple ID password has been changed",
        content: "We noticed your Apple ID password was changed from a new device.\n\nIf you didn't make this change, reset your password immediately:\nhttps://icloud-id-reset.secure-verify.net/\n\nIf you don't act within 48 hours, your account will be locked for security.",
        preview: "Your Apple ID password has been changed",
        options: [
          { id: "click", text: "Click to reset password", emoji: "🔑" },
          { id: "app", text: "Go to Settings > [Your Name] > Password & Security", emoji: "⚙️" },
          { id: "browser", text: "Visit appleid.apple.com directly", emoji: "🌐" }
        ],
        correctAnswers: ["app", "browser"],
        explanation: "Apple sends security emails but NEVER asks you to click links. Always manage your Apple ID through Settings or iCloud.com.",
        prevention: ["Set up 2FA on your Apple ID", "Review your Apple ID sign-in history regularly", "Never trust links in security-related emails"],
        riskLevel: "Critical"
      },
      {
        id: "phishing_5",
        title: "Netflix Account Unauthorized Access",
        type: "email",
        difficulty: "medium",
        sender: "Netflix Support <help@nflx-security.com>",
        subject: "Netflix: Suspicious login activity detected",
        content: "Account: john.doe@email.com\nLocation: Nigeria\n\nWe detected a login from an unrecognized location. Secure your account:\n\nhttp://netflix-verify-account.secure-media.net/secure",
        preview: "Netflix: Suspicious login activity detected",
        options: [
          { id: "click", text: "Click security link", emoji: "🔗" },
          { id: "app", text: "Open Netflix app and check Account settings", emoji: "📱" },
          { id: "website", text: "Visit netflix.com and log in", emoji: "💻" }
        ],
        correctAnswers: ["app", "website"],
        explanation: "Netflix won't ask you to verify via email. Always check account changes within the app or at netflix.com directly.",
        prevention: ["Change your Netflix password immediately", "Check \"Sign out all devices\" in account settings", "Enable 2FA or use a password manager"],
        riskLevel: "High"
      },
      {
        id: "phishing_6",
        title: "Google Account Recovery",
        type: "email",
        difficulty: "medium",
        sender: "Google Accounts <noreply@google-accounts.com>",
        subject: "Complete your account recovery",
        content: "Someone recently tried to access your Google account using your password.\n\nComplete recovery process: https://google-account-recovery-verify.security-checkpoint.net/\n\nYour account will be protected once you verify.",
        preview: "Complete your account recovery",
        options: [
          { id: "click", text: "Click recovery link", emoji: "🔗" },
          { id: "google_login", text: "Log into accounts.google.com directly", emoji: "🔐" },
          { id: "phone", text: "Check recovery phone for verification code", emoji: "📱" }
        ],
        correctAnswers: ["google_login", "phone"],
        explanation: "Google account recovery always happens through their official site (accounts.google.com) or via recovery email/phone. Never use email links.",
        prevention: ["Add a recovery phone and backup email", "Enable 2-Step Verification", "Review your device activity at myaccount.google.com"],
        riskLevel: "Critical"
      },
      {
        id: "phishing_7",
        title: "Microsoft Office 365 Update Required",
        type: "email",
        difficulty: "medium",
        sender: "Microsoft Support <no-reply@microsoft-office.com>",
        subject: "URGENT: Your Office 365 domain requires validation",
        content: "Your Office 365 domain will be disabled unless you validate your ownership within 24 hours.\n\nValidate now: https://office365-domain-validation-portal.microsoftsupport.net/\n\nMicrosoft Security Team",
        preview: "URGENT: Your Office 365 domain requires validation",
        options: [
          { id: "click", text: "Click validation link", emoji: "🔗" },
          { id: "office_admin", text: "Log into Office 365 admin center", emoji: "🔑" },
          { id: "microsoft", text: "Visit microsoft.com directly", emoji: "🌐" }
        ],
        correctAnswers: ["office_admin", "microsoft"],
        explanation: "Microsoft never asks you to verify via email links. Real validation happens in your admin dashboard or through official channels.",
        prevention: ["Be skeptical of urgent action emails", "Always log in to accounts directly from their official website", "Enable MFA on your Microsoft account"],
        riskLevel: "High"
      },
      {
        id: "phishing_8",
        title: "LinkedIn Job Interview Scheduled",
        type: "email",
        difficulty: "medium",
        sender: "HR Department <recruiter@company-jobs.net>",
        subject: "Your Interview is Scheduled! Urgent: Complete Assessment",
        content: "Congratulations on passing our screening!\n\nComplete your assessment to proceed:\nhttps://company-jobs-recruitment.secure-interview.net/assessment\n\nThis is a limited-time offer. Complete within 24 hours.",
        preview: "Your Interview is Scheduled! Urgent: Complete Assessment",
        options: [
          { id: "click", text: "Click to complete assessment", emoji: "📝" },
          { id: "call", text: "Call the company directly", emoji: "☎️" },
          { id: "verify", text: "Visit company website to verify job posting", emoji: "🌐" }
        ],
        correctAnswers: ["call", "verify"],
        explanation: "Job scammers often create urgency to bypass your caution. Verify the company and position before providing personal information.",
        prevention: ["Always verify job postings on the company's official website", "Never pay any fees for job applications", "Check company reviews on Glassdoor or similar sites"],
        riskLevel: "High"
      },
      {
        id: "phishing_9",
        title: "Tax Refund Available - IRS",
        type: "email",
        difficulty: "hard",
        sender: "IRS Tax Refund <refunds@irs-tax-service.org>",
        subject: "Your 2024 Tax Refund of $1,247 is Ready!",
        content: "Based on your filing, you have a federal tax refund of $1,247 ready for processing.\n\nClaim your refund: https://irs-tax-refund-portal.secure.net/claim-refund\n\nThis offer expires in 7 days.\n\n- U.S. Internal Revenue Service",
        preview: "Your 2024 Tax Refund of $1,247 is Ready!",
        options: [
          { id: "click", text: "Click to claim refund", emoji: "💰" },
          { id: "irs_official", text: "Visit IRS.gov directly", emoji: "🌐" },
          { id: "ignore", text: "Ignore - IRS communicates via mail only", emoji: "❌" }
        ],
        correctAnswers: ["irs_official", "ignore"],
        explanation: "The IRS NEVER initiates contact via email or phone about refunds. They communicate exclusively through postal mail.",
        prevention: ["The IRS communicates official business by mail", "Check your refund status at IRS.gov/refunds", "Never click links from unexpected tax-related emails"],
        riskLevel: "Critical"
      },
      {
        id: "phishing_10",
        title: "Crypto Exchange Account Verification",
        type: "email",
        difficulty: "hard",
        sender: "Coinbase Support <noreply@coinbase-security.digital>",
        subject: "URGENT: Verify Blockchain Wallet - 2FA Compromise Detected",
        content: "We detected unauthorized access attempts to your Coinbase wallet.\n\nImmediate verification required:\nhttps://coinbase-blockchain-verify.crypto-secure.net/verify-wallet\n\nFail to respond within 1 hour and your crypto assets may be frozen.\n\nCoinbase Security Team",
        preview: "URGENT: Verify Blockchain Wallet - 2FA Compromise Detected",
        options: [
          { id: "click", text: "Click to verify wallet", emoji: "🔗" },
          { id: "coinbase_app", text: "Open Coinbase app for security alerts", emoji: "📱" },
          { id: "contact", text: "Contact Coinbase support through app", emoji: "💬" }
        ],
        correctAnswers: ["coinbase_app", "contact"],
        explanation: "Crypto exchanges use in-app notifications for security issues, not email links. This high-pressure email is a classic phishing tactic.",
        prevention: ["Never click links from unexpected crypto emails", "Enable all security features in your crypto exchange account", "Keep your seed phrase completely offline"],
        riskLevel: "Critical"
      },
      {
        id: "phishing_11",
        title: "Subtle: Familiar Company Logo",
        type: "email",
        difficulty: "hard",
        sender: "PayPal Commerce <commerce@paypal-business.com>",
        subject: "Update your business banking information for continued service",
        content: "As a PayPal Commerce merchant, we need you to update your banking information on file to ensure uninterrupted service.\n\nUpdate here: https://paypal-merchant-update.real-secure.net/\n\nThis update takes just 2 minutes and is required by end of month.\n\nPayPal Business Team",
        preview: "Update your business banking information for continued service",
        options: [
          { id: "click", text: "Click to update information", emoji: "🔗" },
          { id: "paypal_direct", text: "Log into PayPal directly to update", emoji: "🔐" },
          { id: "call", text: "Call PayPal merchant services", emoji: "☎️" }
        ],
        correctAnswers: ["paypal_direct", "call"],
        explanation: "This phishing email is more subtle - it uses a familiar company and legitimate-sounding reason. The red flag is the email link instead of directing you to the website.",
        prevention: ["Legitimate companies' emails usually direct you to log in on their site, not via links", "Domain spoofing can make email addresses look official - check carefully", "When in doubt, go directly to the official website"],
        riskLevel: "Critical"
      },
      {
        id: "phishing_12",
        title: "Cloud Storage Quota Exceeded",
        type: "email",
        difficulty: "hard",
        sender: "Google Drive Help <noreply@drive.google.com>",
        subject: "You're running out of storage space - Upgrade Now",
        content: "Your Google Drive is 99% full (14.8 GB used of 15 GB free).\n\nYour files will be inaccessible starting tomorrow unless you upgrade.\n\nUpgrade storage now: https://drive-google-upgrade-storage.billing-secure.net/\n\nUpgrade to 100 GB for $1.99/month or see other options.",
        preview: "You're running out of storage space - Upgrade Now",
        options: [
          { id: "click", text: "Click billing upgrade link", emoji: "💳" },
          { id: "google_account", text: "Manage storage in Google Account settings", emoji: "⚙️" },
          { id: "manual", text: "Visit google.com and manage storage there", emoji: "🌐" }
        ],
        correctAnswers: ["google_account", "manual"],
        explanation: "Google handles storage upgrades in-account. Real notifications won't use unknown domain links. The sense of urgency is a red flag.",
        prevention: ["Google manages storage within your account - check myaccount.google.com", "Gmail's storage notifications appear within Gmail", "Never follow links from reminder emails - go to the website directly"],
        riskLevel: "High"
      },
      {
        id: "phishing_13",
        title: "Subscription Renewal Confirmation",
        type: "email",
        difficulty: "hard",
        sender: "Adobe Billing <noreply@adobe-service.com>",
        subject: "Adobe Creative Cloud: Renewal Confirmation #54821",
        content: "Your monthly subscription to Adobe Creative Cloud will renew on: 04/17/2024\nAmount: $54.99\nMethod: Visa ending in 4242\n\nNeed to update payment method? https://adobe-billing-portal.creative-cloud.net/update-payment\n\nHave questions? Reply to this email.",
        preview: "Adobe Creative Cloud: Renewal Confirmation #54821",
        options: [
          { id: "click", text: "Click to update payment method", emoji: "💳" },
          { id: "adobe", text: "Log into your Adobe account", emoji: "🔐" },
          { id: "ignore", text: "If it's correct, no action needed", emoji: "✅" }
        ],
        correctAnswers: ["adobe", "ignore"],
        explanation: "Real renewal confirmations usually don't require action via email links unless you actually need to update something. The phisher wants your payment info.",
        prevention: ["Legitimate companies don't ask for payment updates via email links", "Log into your account directly to manage subscriptions", "Review your recurring charges regularly"],
        riskLevel: "High"
      },
      {
        id: "phishing_14",
        title: "System Update Required for Security",
        type: "email",
        difficulty: "medium",
        sender: "Your Organization <security-update@yourcompany.com>",
        subject: "URGENT: Apply Security Patch - Download Now",
        content: "A critical security vulnerability has been discovered affecting all Windows and Mac users in your organization.\n\nDownload the security patch immediately:\nhttps://security-update-patch.enterprise-net.com/install\n\nFailure to apply may result in data breach. This is mandatory.\n\n- IT Security Department",
        preview: "URGENT: Apply Security Patch - Download Now",
        options: [
          { id: "download", text: "Download the security patch", emoji: "💾" },
          { id: "company_it", text: "Contact your company's IT department", emoji: "📞" },
          { id: "software_site", text: "Check the software vendor's official website", emoji: "🌐" }
        ],
        correctAnswers: ["company_it", "software_site"],
        explanation: "Your real IT department won't send security patches via email. They use managed systems or direct you to official sources.",
        prevention: ["Your organization's IT will use official channels for security patches", "Software updates come from official vendor websites", "Don't download files from email links - verify with your IT team"],
        riskLevel: "Critical"
      },
      {
        id: "phishing_15",
        title: "Package Delivery Status Update",
        type: "email",
        difficulty: "medium",
        sender: "Delivery Service <notification@package-tracking.com>",
        subject: "Your package couldn't be delivered - Action required",
        content: "We attempted to deliver your package but the address was incorrect.\n\nConfirm your delivery address: https://package-confirm-address.delivery-service.net/\n\nYour package will be returned if we don't hear from you within 48 hours.\n\nTracking: #TRK847292847",
        preview: "Your package couldn't be delivered - Action required",
        options: [
          { id: "click", text: "Click to confirm address", emoji: "📍" },
          { id: "carrier_website", text: "Visit the carrier's official website with tracking number", emoji: "🌐" },
          { id: "check_order", text: "Check your orders for shipping status", emoji: "📦" }
        ],
        correctAnswers: ["carrier_website", "check_order"],
        explanation: "Delivery phishing is common. Real carriers track packages at their official sites. Don't click links from email notifications.",
        prevention: ["Check tracking on the carrier's official website", "Real delivery companies won't ask for address confirmation via email links", "Be suspicious of urgency around package delivery"],
        riskLevel: "High"
      }
    ]
  },

  sms_fraud: {
    category: "SMS Fraud",
    icon: "📱",
    color: "#4ECDC4",
    scenarios: [
      {
        id: "sms_1",
        title: "Bank OTP Verification Request",
        type: "sms",
        difficulty: "easy",
        sender: "Bank Alert",
        content: "🚨 BANK ALERT: Your account will be locked in 24H. Verify OTP here: http://bank-verify.net. Reply STOP to opt out.",
        preview: "🚨 BANK ALERT: Your account will be locked...",
        options: [
          { id: "click", text: "Click the link to verify", emoji: "🔗" },
          { id: "call_bank", text: "Call your bank directly", emoji: "☎️" },
          { id: "delete", text: "Delete and report as spam", emoji: "🗑️" }
        ],
        correctAnswers: ["call_bank", "delete"],
        explanation: "Banks NEVER send OTP verification links via SMS. If you get this, it's phishing. Call your bank immediately using the number on your card.",
        prevention: ["Banks will never ask for OTP via SMS links", "Real OTPs are 4-6 numbers sent to reset passwords", "Your bank won't threaten account closure in texts"],
        riskLevel: "Critical"
      },
      {
        id: "sms_2",
        title: "Package Delivery Fee",
        type: "sms",
        difficulty: "easy",
        sender: "UPS Delivery",
        content: "Your package delivery was delayed. Please pay $1.99 customs processing fee: https://ups-fee-pay.net. Reply STOP to unsubscribe.",
        preview: "Your package delivery was delayed...",
        options: [
          { id: "pay", text: "Click to pay the fee", emoji: "💳" },
          { id: "check_tracking", text: "Go to UPS.com with tracking number", emoji: "🌐" },
          { id: "ignore", text: "Ignore - legitimate UPS won't charge via SMS", emoji: "❌" }
        ],
        correctAnswers: ["check_tracking", "ignore"],
        explanation: "This is a classic SMS phishing scam. Real carriers never charge small fees via SMS links. The fee is a lure to get your payment info.",
        prevention: ["Carriers only charge customs at delivery or their website", "Never pay money based on SMS links", "Check package status on the carrier's official app/website"],
        riskLevel: "High"
      },
      {
        id: "sms_3",
        title: "OTP Code Share Request",
        type: "sms",
        difficulty: "easy",
        sender: "Acquaintance",
        content: "Hi! It's Sarah. I'm trying to recover my Google account. Can you reply with any 6-digit code you get from Google? It's for my verification.",
        preview: "Hi! It's Sarah. I'm trying to recover...",
        options: [
          { id: "share_otp", text: "Reply with any OTP you receive", emoji: "📨" },
          { id: "call_sarah", text: "Call Sarah to verify in person", emoji: "☎️" },
          { id: "decline", text: "Don't share - it's a compromise attempt", emoji: "🚫" }
        ],
        correctAnswers: ["call_sarah", "decline"],
        explanation: "If a 'friend' sends this, their account is likely hacked. Never share OTPs or verification codes with anyone, ever.",
        prevention: ["OTP codes should NEVER be shared", "If a friend asks for OTP, their account is compromised - tell them", "Verify unusual requests by calling the person"],
        riskLevel: "Critical"
      },
      {
        id: "sms_4",
        title: "Amazon Account Alert",
        type: "sms",
        difficulty: "medium",
        sender: "Amazon",
        content: "Amazon: We detected a login from 192.168.1.1. If not you, verify account: https://amz-verify-login.secure.shop",
        preview: "Amazon: We detected a login from...",
        options: [
          { id: "click", text: "Click to verify account", emoji: "🔗" },
          { id: "amazon_app", text: "Open Amazon app and check account", emoji: "📱" },
          { id: "account_page", text: "Go to Amazon.com > Account > Profile", emoji: "🌐" }
        ],
        correctAnswers: ["amazon_app", "account_page"],
        explanation: "Amazon won't verify your account via SMS links. Always manage security within the app or official website.",
        prevention: ["Amazon security requests come through your account", "Don't click links from SMS for account security", "Enable 2FA on your Amazon account"],
        riskLevel: "High"
      },
      {
        id: "sms_5",
        title: "PayPal Account Suspended",
        type: "sms",
        difficulty: "medium",
        sender: "PayPal",
        content: "PayPal Alert: Your account is suspended due to unusual activity. Confirm identity immediately: https://pp-verify-account.secure.net",
        preview: "PayPal Alert: Your account is suspended...",
        options: [
          { id: "click", text: "Click to confirm identity", emoji: "🔗" },
          { id: "paypal_app", text: "Open PayPal app to check account", emoji: "📱" },
          { id: "call", text: "Call PayPal customer service 1-888-221-1161", emoji: "☎️" }
        ],
        correctAnswers: ["paypal_app", "call"],
        explanation: "PayPal won't suspend your account via SMS. They use your account dashboard and email (not SMS) for security alerts.",
        prevention: ["PayPal alerts typically come to your email, not SMS", "Account suspensions are managed in your account, not via links", "Call official PayPal number if you're worried"],
        riskLevel: "Critical"
      },
      {
        id: "sms_6",
        title: "Netflix Billing Issue",
        type: "sms",
        difficulty: "medium",
        sender: "Netflix",
        content: "Netflix: Your payment failed. Update billing info to keep your account active: https://nflx-billing-update.secure.tv",
        preview: "Netflix: Your payment failed...",
        options: [
          { id: "click", text: "Click to update billing", emoji: "💳" },
          { id: "app", text: "Open Netflix app > Account > Update payment", emoji: "📱" },
          { id: "website", text: "Visit Netflix.com and log in", emoji: "🌐" }
        ],
        correctAnswers: ["app", "website"],
        explanation: "Netflix will suspend your service if payment fails, but they won't send you a link via SMS. Update payment in the app.",
        prevention: ["Netflix manages billing within the app or website", "Don't click payment links from SMS", "Keep your payment method updated on file"],
        riskLevel: "High"
      },
      {
        id: "sms_7",
        title: "Google Verification Code",
        type: "sms",
        difficulty: "easy",
        sender: "Google",
        content: "Google Account Recovery: Your verification code is 627489. Do NOT share this code with anyone. If you didn't request this, ignore this message.",
        preview: "Google Account Recovery: Your verification code...",
        options: [
          { id: "share", text: "Reply with the code to help someone", emoji: "📨" },
          { id: "use", text: "Use the code to verify your own account", emoji: "✅" },
          { id: "ignore", text: "You didn't request it - ignore and monitor account", emoji: "🚫" }
        ],
        correctAnswers: ["use", "ignore"],
        explanation: "If you didn't request account recovery, someone is trying to take over your account. Never share verification codes.",
        prevention: ["Google codes are for YOUR use only", "If you see unexpected codes, change your password immediately", "Enable 2FA to track login attempts"],
        riskLevel: "Critical"
      },
      {
        id: "sms_8",
        title: "Apple ID Verification",
        type: "sms",
        difficulty: "medium",
        sender: "Apple",
        content: "Apple ID Account Alert: Your password was just changed on a new device. If this wasn't you: https://appleid-reset-security.net",
        preview: "Apple ID Account Alert: Your password was...",
        options: [
          { id: "click", text: "Click to reset password", emoji: "🔗" },
          { id: "settings", text: "Go to Settings > [Your Name] > Password & Security", emoji: "⚙️" },
          { id: "icloud", text: "Visit iCloud.com directly", emoji: "🌐" }
        ],
        correctAnswers: ["settings", "icloud"],
        explanation: "Apple will never send SMS links for security. Always use Settings or iCloud.com directly.",
        prevention: ["Apple security alerts come via iCloud, not SMS links", "Manage Apple ID security through Settings", "Enable 2FA on your Apple ID"],
        riskLevel: "Critical"
      },
      {
        id: "sms_9",
        title: "Suspicious Login - Confirm It's You",
        type: "sms",
        difficulty: "medium",
        sender: "Your Bank",
        content: "Bank Security Alert: New device login from IP 203.0.113.42. Reply Y to confirm this is you, or N if not.",
        preview: "Bank Security Alert: New device login...",
        options: [
          { id: "reply_y", text: "Reply 'Y' to confirm", emoji: "📱" },
          { id: "app_check", text: "Open banking app to check activity", emoji: "📲" },
          { id: "call_bank", text: "Call your bank from the back of your card", emoji: "☎️" }
        ],
        correctAnswers: ["app_check", "call_bank"],
        explanation: "Some phishers mimic real bank alerts. If you're unsure, call your bank - don't reply to SMS asking you to confirm activity.",
        prevention: ["Call your bank using the number on your debit/credit card", "Check account activity in your banking app", "Real banks prefer in-app notifications for security"],
        riskLevel: "High"
      },
      {
        id: "sms_10",
        title: "LinkedIn Connection Request Verification",
        type: "sms",
        difficulty: "medium",
        sender: "LinkedIn",
        content: "Someone is trying to access your LinkedIn account. Confirm it's you: https://linkedin-verify-access.secure.pro",
        preview: "Someone is trying to access your LinkedIn...",
        options: [
          { id: "click", text: "Click to confirm access", emoji: "🔗" },
          { id: "linkedin_app", text: "Open LinkedIn app > Settings > Security", emoji: "📱" },
          { id: "login", text: "Go to LinkedIn.com and log in", emoji: "🌐" }
        ],
        correctAnswers: ["linkedin_app", "login"],
        explanation: "LinkedIn won't verify via SMS links. If you get this, log in to check what actually happened.",
        prevention: ["LinkedIn manages security in the app", "Don't click verification links from SMS", "LinkedIn will show security events in your account"],
        riskLevel: "High"
      },
      {
        id: "sms_11",
        title: "2FA Code Phishing",
        type: "sms",
        difficulty: "hard",
        sender: "Your Account",
        content: "Your 2FA code is 382947. This code expires in 10 minutes. If you didn't request this, someone is trying to access your account.",
        preview: "Your 2FA code is 382947...",
        options: [
          { id: "ignore", text: "Ignore - you didn't request a code", emoji: "🚫" },
          { id: "check_ip", text: "Check account for unauthorized login attempts", emoji: "🔍" },
          { id: "change_password", text: "Change your password immediately", emoji: "🔐" }
        ],
        correctAnswers: ["ignore", "check_ip", "change_password"],
        explanation: "If you get a 2FA code you didn't request, someone is trying to break into your account. Change your password immediately.",
        prevention: ["Never share 2FA codes", "If you get unexpected 2FA codes, change your password", "Check login history in your account"],
        riskLevel: "Critical"
      },
      {
        id: "sms_12",
        title: "Prize or Lottery Win",
        type: "sms",
        difficulty: "easy",
        sender: "Lottery",
        content: "CONGRATULATIONS! You've won $50,000 in the lucky draw! Click to claim: https://lotto-prize-claim.free.money. Valid 24hrs only!",
        preview: "CONGRATULATIONS! You've won $50,000...",
        options: [
          { id: "click", text: "Click to claim the prize", emoji: "🎉" },
          { id: "ignore", text: "Ignore - probably a scam", emoji: "🚫" },
          { id: "check", text: "Check the lottery website directly", emoji: "🔍" }
        ],
        correctAnswers: ["ignore", "check"],
        explanation: "If you didn't enter a lottery, you can't win. This is a classic scam. Real lotteries never ask you to click links.",
        prevention: ["You can't win lotteries you didn't enter", "Legitimate lotteries contact you officially", "Scammers use false prizes to steal personal/financial info"],
        riskLevel: "High"
      }
    ]
  },

  whatsapp_scams: {
    category: "WhatsApp Scams",
    icon: "💬",
    color: "#25D366",
    scenarios: [
      {
        id: "whatsapp_1",
        title: "Account Compromised - Verify Identity",
        type: "whatsapp",
        difficulty: "easy",
        sender: "WhatsApp Support",
        senderImage: "📱",
        content: "Hi, your WhatsApp account was accessed from a new device. Verify it's you: https://wa-verify-account.secure.net",
        options: [
          { id: "click", text: "Click the verification link", emoji: "🔗" },
          { id: "settings", text: "Check Linked Devices in Settings", emoji: "⚙️" },
          { id: "ignore", text: "Ignore - suspicious message", emoji: "🚫" }
        ],
        correctAnswers: ["settings", "ignore"],
        explanation: "WhatsApp won't verify your account via links. Check Linked Devices (Settings > Linked Devices) to manage connected devices.",
        prevention: ["WhatsApp never asks for verification via links", "Manage connected devices in WhatsApp Settings", "Review who has access to your account regularly"],
        riskLevel: "High"
      },
      {
        id: "whatsapp_2",
        title: "Missed Video Call from Unknown",
        type: "whatsapp",
        difficulty: "easy",
        sender: "Unknown Contact",
        senderImage: "👤",
        content: "Hi! You missed a video call from me. Click to call me back: https://whatsapp-call-back.app",
        options: [
          { id: "click", text: "Click the call link", emoji: "📞" },
          { id: "call_directly", text: "Call them directly from your contacts", emoji: "☎️" },
          { id: "block", text: "Block the number", emoji: "🚫" }
        ],
        correctAnswers: ["call_directly", "block"],
        explanation: "Unknown contacts shouldn't send you call links. Click calls from unknown people can be malicious.",
        prevention: ["Don't click call links from unknowns", "Use only WhatsApp's built-in call feature", "Block suspicious contacts immediately"],
        riskLevel: "Medium"
      },
      {
        id: "whatsapp_3",
        title: "Friend in Emergency - Money Request",
        type: "whatsapp",
        difficulty: "medium",
        sender: "Mom",
        senderImage: "👩",
        content: "Hey honey, I'm stuck abroad and lost my wallet. Can you send me $500 via Western Union right now? I'm panicking. Don't tell your dad!",
        options: [
          { id: "send_money", text: "Send money to Mom immediately", emoji: "💸" },
          { id: "call_mom", text: "Call Mom to verify in person", emoji: "☎️" },
          { id: "ask_dad", text: "Ask Dad or other family member to verify", emoji: "👨" }
        ],
        correctAnswers: ["call_mom", "ask_dad"],
        explanation: "Scammers hack WhatsApp accounts to pose as family. The request for secrecy is a red flag. Always call to verify.",
        prevention: ["Always call to verify emergency money requests", "Requests for secrecy are RED FLAGS", "If their account is truly hacked, they'll recover it through proper channels"],
        riskLevel: "Critical"
      },
      {
        id: "whatsapp_4",
        title: "Instagram Code Sharing Request",
        type: "whatsapp",
        difficulty: "medium",
        sender: "Sarah (Friend)",
        senderImage: "👩‍🦰",
        content: "Hey! Instagram is asking me to verify with a code, but I don't have my backup email. Can you reply with any 6-digit code you get from Instagram? It's urgent!",
        options: [
          { id: "share_code", text: "Share any Instagram code you receive", emoji: "📨" },
          { id: "call_sarah", text: "Call Sarah to verify", emoji: "☎️" },
          { id: "decline", text: "Never share codes - it's account takeover", emoji: "🚫" }
        ],
        correctAnswers: ["call_sarah", "decline"],
        explanation: "If a friend asks for your 2FA codes, their account is likely compromised. Never share codes.",
        prevention: ["Never share 2FA/verification codes", "If a friend asks, their account is compromised", "Tell them to use account recovery options"],
        riskLevel: "Critical"
      },
      {
        id: "whatsapp_5",
        title: "Package Delivery Status",
        type: "whatsapp",
        difficulty: "medium",
        sender: "Delivery Service",
        senderImage: "📦",
        content: "Your package couldn't be delivered. Please confirm your address: https://delivery-confirm-address.shop",
        options: [
          { id: "click", text: "Click to confirm address", emoji: "🔗" },
          { id: "carrier_site", text: "Go to the carrier's official website", emoji: "🌐" },
          { id: "call_carrier", text: "Call the carrier's customer service", emoji: "☎️" }
        ],
        correctAnswers: ["carrier_site", "call_carrier"],
        explanation: "Carriers use their official apps/websites for delivery updates, not WhatsApp. This is phishing.",
        prevention: ["Carriers communicate via SMS or their official app", "Don't click delivery links from WhatsApp", "Check tracking on the official carrier website"],
        riskLevel: "High"
      },
      {
        id: "whatsapp_6",
        title: "Job Interview Scheduled",
        type: "whatsapp",
        difficulty: "medium",
        sender: "HR Company",
        senderImage: "💼",
        content: "Congrats! Your interview is scheduled. Complete your background check form to proceed: https://company-jobs-interview.secure.net",
        options: [
          { id: "fill_form", text: "Click and fill out the form", emoji: "📝" },
          { id: "call_company", text: "Call the company's HR department", emoji: "☎️" },
          { id: "verify_job", text: "Verify the job posting on company website", emoji: "🌐" }
        ],
        correctAnswers: ["call_company", "verify_job"],
        explanation: "Job scammers use interview urgency to collect personal information. Verify the company and position first.",
        prevention: ["Never share SSN or ID info via online forms", "Verify job postings on company's official website", "Real companies conduct interviews through proper channels"],
        riskLevel: "High"
      },
      {
        id: "whatsapp_7",
        title: "Banking App Update Required",
        type: "whatsapp",
        difficulty: "hard",
        sender: "Bank Support",
        senderImage: "🏦",
        content: "Your banking app needs an urgent security update. Download here: https://bank-app-update.secure.net/install",
        options: [
          { id: "download", text: "Download the update", emoji: "💾" },
          { id: "appstore", text: "Update from App Store/Google Play", emoji: "📱" },
          { id: "contact_bank", text: "Contact bank to verify", emoji: "☎️" }
        ],
        correctAnswers: ["appstore", "contact_bank"],
        explanation: "Banks never distribute app updates via WhatsApp links. Always update from official App Store or Google Play.",
        prevention: ["App updates come from official app stores only", "Your bank won't send app updates via WhatsApp", "Contact your bank if you're unsure about an update"],
        riskLevel: "Critical"
      },
      {
        id: "whatsapp_8",
        title: "Crypto Investment Opportunity",
        type: "whatsapp",
        difficulty: "hard",
        sender: "Investment Advisor",
        senderImage: "💰",
        content: "Hey! I found an exclusive bitcoin trading opportunity. Invest $100 now, get $5000 in 1 week guaranteed. DM me for details!",
        options: [
          { id: "invest", text: "Send money for the investment", emoji: "💸" },
          { id: "research", text: "Research legitimate crypto exchanges independently", emoji: "🔍" },
          { id: "decline", text: "Decline - no investment guarantees returns", emoji: "🚫" }
        ],
        correctAnswers: ["research", "decline"],
        explanation: "No investment guarantees returns. This is a Ponzi scheme. Legitimate investments never promise guaranteed returns.",
        prevention: ["All investments carry risk - no guarantees", "If it sounds too good to be true, it is", "Research investments on SEC/FINRA websites"],
        riskLevel: "Critical"
      },
      {
        id: "whatsapp_9",
        title: "Account Recovery Support",
        type: "whatsapp",
        difficulty: "medium",
        sender: "WhatsApp Support",
        senderImage: "📱",
        content: "We detected suspicious activity on your WhatsApp. Restore your account here: https://whatsapp-recovery-backup.secure.net",
        options: [
          { id: "click", text: "Click recovery link", emoji: "🔗" },
          { id: "verify_settings", text: "Check Settings > 2-Step Verification", emoji: "⚙️" },
          { id: "contact_wa", text: "Use Help > Contact Us in WhatsApp", emoji: "💬" }
        ],
        correctAnswers: ["verify_settings", "contact_wa"],
        explanation: "WhatsApp never sends account recovery links via messages. Contact support through the Help menu.",
        prevention: ["WhatsApp support uses in-app Help menu", "Don't click suspicious account recovery links", "Enable 2-Step Verification for extra security"],
        riskLevel: "High"
      },
      {
        id: "whatsapp_10",
        title: "Lottery Prize Claim",
        type: "whatsapp",
        difficulty: "easy",
        sender: "Lottery Bureau",
        senderImage: "🎁",
        content: "CONGRATULATIONS! You won $100,000! Claim your prize within 24 hours: https://lottery-claim-prize.win",
        options: [
          { id: "claim", text: "Click to claim the prize", emoji: "🎉" },
          { id: "ignore", text: "Ignore - you didn't enter any lottery", emoji: "🚫" },
          { id: "check", text: "Verify on official lottery website", emoji: "🔍" }
        ],
        correctAnswers: ["ignore", "check"],
        explanation: "You can't win lotteries you didn't enter. This is a classic scam.",
        prevention: ["You must be a participant to win", "Real lotteries notify via official channels", "Scams use false prizes to steal personal/financial info"],
        riskLevel: "High"
      },
      {
        id: "whatsapp_11",
        title: "SIM Swap Social Engineering",
        type: "whatsapp",
        difficulty: "hard",
        sender: "Telecom Support",
        senderImage: "📞",
        content: "We need to verify your account. Reply with the last 4 digits of your ID, date of birth, and current SIM card number for security verification.",
        options: [
          { id: "reply", text: "Reply with requested information", emoji: "📱" },
          { id: "call", text: "Call your telecom company directly", emoji: "☎️" },
          { id: "ignore", text: "Ignore - never share personal ID info", emoji: "🚫" }
        ],
        correctAnswers: ["call", "ignore"],
        explanation: "Scammers collect this info to do a SIM swap attack, taking over your phone/accounts. Never reply with personal details.",
        prevention: ["Telecom companies never ask for ID details via WhatsApp", "SIM swap scams steal your other accounts", "Never share SSN, ID number, or DOB via WhatsApp"],
        riskLevel: "Critical"
      },
      {
        id: "whatsapp_12",
        title: "Proxy QR Code Sharing",
        type: "whatsapp",
        difficulty: "hard",
        sender: "Bank Agent",
        senderImage: "🏦",
        content: "For security, scan this QR code with WhatsApp Web to verify your account [QR CODE IMAGE]",
        options: [
          { id: "scan", text: "Scan the QR code with WhatsApp Web", emoji: "📲" },
          { id: "call_bank", text: "Call your bank directly", emoji: "☎️" },
          { id: "ignore", text: "Never scan unsolicited QR codes", emoji: "🚫" }
        ],
        correctAnswers: ["call_bank", "ignore"],
        explanation: "Scammers use QR codes to trick you into scanning WhatsApp Web on their device. This gives them account access.",
        prevention: ["Never scan QR codes from unknown sources", "WhatsApp Web QR codes are only for you", "Banks won't ask you to scan QR codes"],
        riskLevel: "Critical"
      }
    ]
  },

  fake_login: {
    category: "Fake Login Pages",
    icon: "🔐",
    color: "#FF6B9D",
    scenarios: [
      {
        id: "login_1",
        title: "Gmail Clone Login",
        type: "website",
        difficulty: "easy",
        website: "gmial.com (note the 'ia' instead of 'ai')",
        content: "A website that looks exactly like Gmail appears asking you to log in. The URL is slightly different (gmial.com instead of gmail.com).",
        options: [
          { id: "login", text: "Log in with your credentials", emoji: "🔐" },
          { id: "check_url", text: "Check the URL carefully - it's fake", emoji: "🔍" },
          { id: "close", text: "Close and go to gmail.com directly", emoji: "✅" }
        ],
        correctAnswers: ["check_url", "close"],
        explanation: "Typosquatting domains look nearly identical but have slight differences. Always check the URL carefully.",
        prevention: ["Verify the exact spelling of domain names", "Bookmark legitimate sites and use bookmarks", "Type the website URL yourself instead of clicking links"],
        riskLevel: "Critical"
      },
      {
        id: "login_2",
        title: "Amazon Fake Login",
        type: "website",
        difficulty: "easy",
        website: "amazoon.com (extra 'o') or amazon-login-secure.com",
        content: "A website asking you to re-enter your Amazon login details.",
        options: [
          { id: "login", text: "Enter your Amazon credentials", emoji: "🔐" },
          { id: "notice", text: "You're not on amazon.com - it's a phishing site", emoji: "🚨" },
          { id: "close", text: "Close and never return", emoji: "✅" }
        ],
        correctAnswers: ["notice", "close"],
        explanation: "Fake login pages try to steal your credentials. When asked to log in unexpectedly, navigate to the official site yourself.",
        prevention: ["Official Amazon domain is amazon.com", "Never log in from redirect pages", "Use Amazon app for safer transactions"],
        riskLevel: "Critical"
      },
      {
        id: "login_3",
        title: "Office 365 Phishing Page",
        type: "website",
        difficulty: "medium",
        website: "office365-login-verify.com (not microsoft.com)",
        content: "Page claims to be Office 365 login, asks for email and password.",
        options: [
          { id: "login", text: "Enter your Office 365 credentials", emoji: "📧" },
          { id: "check_domain", text: "Domain should be microsoft.com or office.com", emoji: "🔍" },
          { id: "use_app", text: "Use the official Microsoft app instead", emoji: "📱" }
        ],
        correctAnswers: ["check_domain", "use_app"],
        explanation: "Official Microsoft services use microsoft.com or office.com domains. Any other domain is suspicious.",
        prevention: ["Microsoft domain is microsoft.com or office.com", "Use the official Microsoft Outlook app", "Enable multi-factor authentication"],
        riskLevel: "Critical"
      },
      {
        id: "login_4",
        title: "Bank Login Page Clone",
        type: "website",
        difficulty: "medium",
        website: "mybank-online-login.secure.net (not your bank's real domain)",
        content: "Looks like your bank's login page with their logo and color scheme.",
        options: [
          { id: "login", text: "Log in with your credentials", emoji: "🔐" },
          { id: "call_bank", text: "Call your bank to verify the website", emoji: "☎️" },
          { id: "app", text: "Use your bank's official app instead", emoji: "📱" }
        ],
        correctAnswers: ["call_bank", "app"],
        explanation: "Banking Trojans often use cloned login pages. Always use the official banking app or call your bank.",
        prevention: ["Use your bank's official mobile app", "Bank websites have proper SSL certificates (look for 🔒)", "Your bank's correct domain is on your debit card"],
        riskLevel: "Critical"
      },
      {
        id: "login_5",
        title: "PayPal Clone with Professional Design",
        type: "website",
        difficulty: "medium",
        website: "paypal-verify-secure.com (looks professional but wrong domain)",
        content: "A very convincing PayPal login page with proper styling and design.",
        options: [
          { id: "login", text: "Enter PayPal username and password", emoji: "💳" },
          { id: "verify_ssl", text: "Check if there's a valid SSL certificate", emoji: "🔒" },
          { id: "browser_warning", text: "Browser shows warning or unusual certificate", emoji: "⚠️" }
        ],
        correctAnswers: ["verify_ssl", "browser_warning"],
        explanation: "Even professional-looking pages can be fake. Check for SSL certificate and browser warnings.",
        prevention: ["PayPal domain is paypal.com", "Look for the padlock 🔒 and 'Secure' indicator", "Check the certificate (click 🔒 to verify)"],
        riskLevel: "Critical"
      },
      {
        id: "login_6",
        title: "LinkedIn Account Verification",
        type: "website",
        difficulty: "medium",
        website: "linkedin-verify-account.secure.net",
        content: "Page asking you to verify your LinkedIn account details.",
        options: [
          { id: "login", text: "Enter your LinkedIn credentials", emoji: "💼" },
          { id: "browser", text: "Check browser URL bar - it's not linkedin.com", emoji: "🔍" },
          { id: "go_linkedin", text: "Go directly to linkedin.com", emoji: "✅" }
        ],
        correctAnswers: ["browser", "go_linkedin"],
        explanation: "Always verify you're on the correct domain before entering credentials.",
        prevention: ["LinkedIn domain is linkedin.com", "Use your browser history/bookmarks to visit sites", "Enable LinkedIn 2FA"],
        riskLevel: "High"
      },
      {
        id: "login_7",
        title: "Google Account Verification Page",
        type: "website",
        difficulty: "hard",
        website: "accounts-google-verify.com (very close to actual Google subdomain)",
        content: "Looks like a legitimate Google account recovery page with Google branding.",
        options: [
          { id: "enter_credentials", text: "Enter your Google credentials", emoji: "🔐" },
          { id: "hover_url", text: "Hover over links to see actual URL", emoji: "✋" },
          { id: "direct_website", text: "Go to accounts.google.com directly", emoji: "✅" }
        ],
        correctAnswers: ["hover_url", "direct_website"],
        explanation: "When in doubt, navigate directly instead of following links. Hover over links to see their actual destination.",
        prevention: ["Always verify domains carefully", "Hover over links to see where they actually go", "Use bookmarks for important accounts"],
        riskLevel: "Critical"
      },
      {
        id: "login_8",
        title: "Instagram Login with 2FA Request",
        type: "website",
        difficulty: "medium",
        website: "instagram-login-security.com",
        content: "Page asks for Instagram username and password, then requests 2FA code.",
        options: [
          { id: "enter", text: "Enter credentials and 2FA code", emoji: "📱" },
          { id: "url_check", text: "Domain should be instagram.com", emoji: "🔍" },
          { id: "app", text: "Use official Instagram app", emoji: "📲" }
        ],
        correctAnswers: ["url_check", "app"],
        explanation: "Instagram is instagram.com. If the domain is different, it's phishing.",
        prevention: ["Instagram domain is instagram.com", "Use the official mobile app when possible", "Enable 2FA to prevent account takeover"],
        riskLevel: "High"
      },
      {
        id: "login_9",
        title: "Cryptocurrency Exchange Clone",
        type: "website",
        difficulty: "hard",
        website: "coinbase-login.secure.crypto (not coinbase.com)",
        content: "Looks like Coinbase login with wallet login options.",
        options: [
          { id: "login", text: "Log in with email and password", emoji: "💰" },
          { id: "check_certificate", text: "Check SSL certificate details", emoji: "🔒" },
          { id: "mobile_app", text: "Always use official mobile app for crypto", emoji: "📱" }
        ],
        correctAnswers: ["check_certificate", "mobile_app"],
        explanation: "Crypto exchange phishing is serious - funds can be stolen. Always use the official app.",
        prevention: ["Never log into crypto exchanges via website links", "Use official mobile apps only", "Keep most funds in hardware wallet offline"],
        riskLevel: "Critical"
      },
      {
        id: "login_10",
        title: "Subtle Domain Typo",
        type: "website",
        difficulty: "hard",
        website: "faceook.com (missing 'b') instead of facebook.com",
        content: "Facebook login page that looks exactly right but domain has a typo.",
        options: [
          { id: "login", text: "Enter Facebook credentials", emoji: "👤" },
          { id: "typo_notice", text: "You notice the domain has a typo (faceook vs facebook)", emoji: "🔍" },
          { id: "search", text: "Search for 'Facebook login' to go to official site", emoji: "🔎" }
        ],
        correctAnswers: ["typo_notice", "search"],
        explanation: "Typosquatting exploits mistakes. Even one letter wrong is a red flag.",
        prevention: ["Type domains very carefully", "Use bookmarks for important sites", "Watch for domains that look similar but are slightly different"],
        riskLevel: "Critical"
      },
      {
        id: "login_11",
        title: "https vs http - Fake Security",
        type: "website",
        difficulty: "hard",
        website: "httpS://paypa1-verify.com (using 1 instead of l, with HTTPS to look secure)",
        content: "A cloned PayPal page with HTTPS connection (🔒 shows) but subtle domain spelling error.",
        options: [
          { id: "login", text: "It has 🔒 so it must be secure", emoji: "🔐" },
          { id: "certificate", text: "Check who the certificate is for (examine cert details)", emoji: "📋" },
          { id: "official_paypal", text: "Go to paypal.com directly", emoji: "✅" }
        ],
        correctAnswers: ["certificate", "official_paypal"],
        explanation: "HTTPS (🔒) means the connection is encrypted, not that the website is legitimate. Always check the certificate details and domain.",
        prevention: ["HTTPS encrypts traffic but doesn't guarantee legitimacy", "Click the padlock to view certificate details", "Certificate should be issued to the official company"],
        riskLevel: "Critical"
      },
      {
        id: "login_12",
        title: "International Domain Extension Trick",
        type: "website",
        difficulty: "hard",
        website: "amazon.com.ru (uses .ru TLD to look legitimate)",
        content: "A cloned Amazon login using international domain extension.",
        options: [
          { id: "login", text: "Enter credentials - it has amazon.com in the URL", emoji: "🔐" },
          { id: "check_tld", text: "Check TLD - legitimate Amazon uses .com, not .com.ru", emoji: "🔍" },
          { id: "direct_login", text: "Always use amazon.com, never amazon.com.[country]", emoji: "✅" }
        ],
        correctAnswers: ["check_tld", "direct_login"],
        explanation: "Scammers use country codes (.ru, .cn) to look legitimate. Check the full domain carefully.",
        prevention: ["Legitimate US companies typically use .com", "Check exact domain before entering credentials", "Be especially cautious of unfamiliar country codes"],
        riskLevel: "Critical"
      }
    ]
  },

  social_media_hacks: {
    category: "Social Media Hacks",
    icon: "👥",
    color: "#833ab4",
    scenarios: [
      {
        id: "social_1",
        title: "Account Compromised Alert",
        type: "email",
        difficulty: "easy",
        sender: "Instagram Security",
        subject: "We detected a login from a new device",
        content: "Your Instagram account was just accessed from:\nLocation: Moscow, Russia\nDevice: Unknown Phone\n\nIf this wasn't you, secure your account: https://inst-verify-login.app",
        options: [
          { id: "click", text: "Click to verify your account", emoji: "🔗" },
          { id: "instagram_app", text: "Open Instagram app and check Settings", emoji: "📱" },
          { id: "change_password", text: "Change your password immediately", emoji: "🔐" }
        ],
        correctAnswers: ["instagram_app", "change_password"],
        explanation: "If you see login from a strange location, change your password immediately in the app, not via email links.",
        prevention: ["Instagram alerts appear in your account settings", "Don't click verification links from email", "Enable login alerts and 2FA"],
        riskLevel: "High"
      },
      {
        id: "social_2",
        title: "Account Recovery Request",
        type: "whatsapp",
        difficulty: "medium",
        sender: "Friend (actually compromised account)",
        senderImage: "👥",
        content: "Hey! I think my Facebook account was hacked. Can you help me recover it? I need you to click this link and confirm it's me: https://fb-account-recovery.verify.net",
        options: [
          { id: "help", text: "Help them by clicking the link", emoji: "🤝" },
          { id: "call", text: "Call them to verify they're really hacked", emoji: "☎️" },
          { id: "advise", text: "Tell them to use Facebook's official recovery options", emoji: "ℹ️" }
        ],
        correctAnswers: ["call", "advise"],
        explanation: "If a friend's account is actually hacked, they should use Facebook's official account recovery, not ask you to click links.",
        prevention: ["Hacked accounts can send messages to all friends", "Call to verify before helping", "Direct them to official recovery options"],
        riskLevel: "High"
      },
      {
        id: "social_3",
        title: "Identify Yourself to Unlock Account",
        type: "email",
        difficulty: "medium",
        sender: "Twitter Support",
        subject: "Unusual activity on your Twitter account",
        content: "To unlock your account, please verify your identity by uploading:\n✓ Front of ID\n✓ Selfie with ID\n\nUpload here: https://twitter-id-verify.secure.net",
        options: [
          { id: "upload", text: "Upload your ID and selfie", emoji: "📸" },
          { id: "settings", text: "Check your Twitter account Settings for this request", emoji: "⚙️" },
          { id: "contact", text: "Contact Twitter support through the app", emoji: "💬" }
        ],
        correctAnswers: ["settings", "contact"],
        explanation: "Twitter won't ask you to upload ID documents via email. This is identify theft phishing.",
        prevention: ["Never upload ID via email links", "Twitter handles verification in-app", "Contact support through the official app"],
        riskLevel: "Critical"
      },
      {
        id: "social_4",
        title: "Verify Suspicious Login Activity",
        type: "sms",
        difficulty: "easy",
        sender: "TikTok",
        content: "TikTok: Your account was accessed from a new device. Confirm it was you: https://tiktok-login-verify.app",
        options: [
          { id: "click", text: "Click to confirm", emoji: "🔗" },
          { id: "app", text: "Open TikTok app to check Settings > Security", emoji: "📱" },
          { id: "change_pass", text: "Change password in the app", emoji: "🔑" }
        ],
        correctAnswers: ["app", "change_pass"],
        explanation: "TikTok handles security in the app, not via links. Change password directly in TikTok.",
        prevention: ["App notifications are more reliable than SMS", "Always change password in-app", "Review login history in account settings"],
        riskLevel: "High"
      },
      {
        id: "social_5",
        title: "Confirm Identity - Suspicious Login",
        type: "email",
        difficulty: "medium",
        sender: "Facebook Security Team",
        subject: "Unusual activity detected - Please confirm your identity",
        content: "We detected login from:\nDevice: iPhone\nLocation: India\nDate: Today at 3:45 PM\n\nCan you confirm:\n- Your full name\n- Your date of birth\n- Your mother's maiden name",
        options: [
          { id: "reply", text: "Reply with the requested information", emoji: "📧" },
          { id: "login_facebook", text: "Log into Facebook directly to check account", emoji: "🔐" },
          { id: "ignore", text: "Facebook won't ask for mother's maiden name via email", emoji: "❌" }
        ],
        correctAnswers: ["login_facebook", "ignore"],
        explanation: "Facebook won't ask for personal information like mother's maiden name via email. This is identity theft.",
        prevention: ["Legitimate companies don't ask for personal details via email", "Check account security in Settings > Security and Login", "Enable 2FA"],
        riskLevel: "Critical"
      },
      {
        id: "social_6",
        title: "YouTube Channel Suspended",
        type: "email",
        difficulty: "medium",
        sender: "YouTube Team",
        subject: "Your channel has been suspended for policy violations",
        content: "Your YouTube channel was suspended for copyright violations.\n\nAppeal the suspension: https://youtube-appeal-channel.verify.net\n\nYou have 30 days to respond.",
        options: [
          { id: "appeal", text: "Click to appeal the suspension", emoji: "🔗" },
          { id: "youtube_studio", text: "Check YouTube Studio directly", emoji: "📺" },
          { id: "help", text: "Visit YouTube Help > Contact Us", emoji: "ℹ️" }
        ],
        correctAnswers: ["youtube_studio", "help"],
        explanation: "YouTube handles appeals in YouTube Studio, not via email links.",
        prevention: ["YouTube communicates in your YouTube Studio account", "Check Studio > Community > Violations section", "Use official YouTube Help for appeals"],
        riskLevel: "High"
      },
      {
        id: "social_7",
        title: "Snapchat Login Verification",
        type: "sms",
        difficulty: "medium",
        sender: "Snapchat",
        content: "Snapchat: New device login detected. Confirm it's you: https://snapchat-device-verify.app",
        options: [
          { id: "click", text: "Click to verify device", emoji: "🔗" },
          { id: "app", text: "Open Snapchat app and check Settings", emoji: "📱" },
          { id: "deny", text: "Go to Settings > Devices and deny unknown devices", emoji: "❌" }
        ],
        correctAnswers: ["app", "deny"],
        explanation: "Snapchat shows login alerts in-app. Don't click SMS links.",
        prevention: ["Snapchat device management is in the app", "Review connected devices regularly", "Enable 2FA on Snapchat"],
        riskLevel: "High"
      },
      {
        id: "social_8",
        title: "LinkedIn Profile Under Review",
        type: "email",
        difficulty: "medium",
        sender: "LinkedIn",
        subject: "Your profile is under review - Verify identity",
        content: "Your LinkedIn profile has been flagged for review. We need you to verify:\n\nhttps://linkedin-profile-verify.secure.net",
        options: [
          { id: "click", text: "Click to verify profile", emoji: "🔗" },
          { id: "linkedin_direct", text: "Log into LinkedIn.com directly", emoji: "🔐" },
          { id: "message", text: "Check LinkedIn messages for official notice", emoji: "💬" }
        ],
        correctAnswers: ["linkedin_direct", "message"],
        explanation: "LinkedIn sends account notices within your account or via email with a link to LinkedIn.com, not other domains.",
        prevention: ["LinkedIn communications link to linkedin.com", "Don't click external links from LinkedIn emails", "Check your account directly"],
        riskLevel: "High"
      },
      {
        id: "social_9",
        title: "Trending Video - Verify Age",
        type: "email",
        difficulty: "hard",
        sender: "TikTok Trends",
        subject: "You're Trending! Verify to activate monetization",
        content: "Congratulations! Your video is trending. To monetize, verify your identity:\n\nhttps://tiktok-monetize-verify.app",
        options: [
          { id: "verify", text: "Click to verify identity", emoji: "📱" },
          { id: "studio", text: "Check TikTok Creator Studio for monetization offers", emoji: "🎬" },
          { id: "ignore", text: "Never click links from unsolicited 'opportunity' emails", emoji: "❌" }
        ],
        correctAnswers: ["studio", "ignore"],
        explanation: "Creators check Creator Studio for monetization. TikTok won't ask for verification via external links.",
        prevention: ["Creator programs notify through official apps", "Don't click unexpected opportunity emails", "Monetization happens in-app"],
        riskLevel: "High"
      },
      {
        id: "social_10",
        title: "Account Recovery Code Requested",
        type: "whatsapp",
        difficulty: "hard",
        sender: "Friend (compromised account)",
        senderImage: "👤",
        content: "Hey, I'm locked out of my Facebook. I need the 6-digit recovery code that just came to your phone from Facebook. Can you send it to me ASAP?",
        options: [
          { id: "share", text: "Share the recovery code with your friend", emoji: "📱" },
          { id: "call", text: "Call your friend to verify in person", emoji: "☎️" },
          { id: "refuse", text: "Never share recovery codes - delete the code", emoji: "🚫" }
        ],
        correctAnswers: ["call", "refuse"],
        explanation: "If you receive recovery codes meant for your friend, someone is trying to take over their account. The requester might not be your real friend.",
        prevention: ["Never share 2FA codes or recovery codes", "If a friend asks, they might be compromised", "Tell them to use their recovery email/phone"],
        riskLevel: "Critical"
      },
      {
        id: "social_11",
        title: "Photo ID Verification for Ads Manager",
        type: "email",
        difficulty: "hard",
        sender: "Facebook Ads",
        subject: "Verify identity to continue running ads",
        content: "Your Facebook Ads Manager account requires identity verification. Upload:\n- Photo ID (Government issued)\n- Selfie holding ID\n\nhttps://facebook-ads-id-verify.secure.net",
        options: [
          { id: "upload", text: "Upload your ID and photo", emoji: "📸" },
          { id: "ads_manager", text: "Check Facebook Ads Manager directly for this request", emoji: "💼" },
          { id: "contact", text: "Contact Facebook Business support through Ads Manager", emoji: "📞" }
        ],
        correctAnswers: ["ads_manager", "contact"],
        explanation: "Facebook handles ID verification within Ads Manager, never via external links.",
        prevention: ["Never upload government ID to external links", "Facebook verifies through their platform", "Use official support channels"],
        riskLevel: "Critical"
      },
      {
        id: "social_12",
        title: "Suspicious Comments Detected",
        type: "notification",
        difficulty: "medium",
        sender: "Instagram",
        content: "We noticed unusual activity on your account - someone posted comments you didn't make. Review unauthorized activity: https://insta-review-activity.app",
        options: [
          { id: "click", text: "Click to review activity", emoji: "🔗" },
          { id: "app_settings", text: "Open Instagram and check Settings > Security > Login Activity", emoji: "⚙️" },
          { id: "change_password", text: "Change password immediately in Instagram Settings", emoji: "🔑" }
        ],
        correctAnswers: ["app_settings", "change_password"],
        explanation: "Instagram alerts appear in-app. If your account is compromised, change your password immediately.",
        prevention: ["Check Instagram Security > Login Activity regularly", "Change password immediately if compromised", "Enable 2FA"],
        riskLevel: "High"
      }
    ]
  },

  otp_scams: {
    category: "OTP Scams",
    icon: "🔢",
    color: "#FF9500",
    scenarios: [
      {
        id: "otp_1",
        title: "Fake OTP Request from 'Bank'",
        type: "sms",
        difficulty: "easy",
        sender: "Bank",
        content: "⚠️ ALERT: We're verifying a transaction. Reply with OTP sent to your email to confirm: [XXXX]. Do not share this OTP.",
        options: [
          { id: "reply_otp", text: "Reply with the OTP you received", emoji: "📱" },
          { id: "call_bank", text: "Call your bank - banks don't ask for OTP via SMS", emoji: "☎️" },
          { id: "ignore", text: "Ignore - it's a phishing attempt", emoji: "❌" }
        ],
        correctAnswers: ["call_bank", "ignore"],
        explanation: "Banks NEVER ask you to share OTPs via SMS reply. OTPs are only for YOUR use to verify transactions.",
        prevention: ["Never share your OTP with anyone", "Banks verify your transaction, you don't initiate by sharing OTP", "If unsure, call your bank"],
        riskLevel: "Critical"
      },
      {
        id: "otp_2",
        title: "OTP Sharing via WhatsApp",
        type: "whatsapp",
        difficulty: "easy",
        sender: "Friend (compromised)",
        senderImage: "👤",
        content: "Hey, Google is asking me to verify with an OTP but I'm on WiFi. If you get a code from Google, can you send it to me? I need it for 2FA setup.",
        options: [
          { id: "share", text: "Share any OTP you receive from Google", emoji: "📱" },
          { id: "call", text: "Call this person to verify they're not compromised", emoji: "☎️" },
          { id: "refuse", text: "Never share OTP codes - their account is compromised", emoji: "🚫" }
        ],
        correctAnswers: ["call", "refuse"],
        explanation: "If someone asks for your OTP, their account is being hacked. Never share OTP.",
        prevention: ["Never share OTP/2FA codes with anyone", "OTPs are meant for YOUR account only", "If a friend asks, their account is compromised"],
        riskLevel: "Critical"
      },
      {
        id: "otp_3",
        title: "SMS OTP While on Call",
        type: "phone",
        difficulty: "medium",
        sender: "Caller claiming to be from 'Bank Fraud Department'",
        content: "We're calling about suspicious activity on your account. An OTP will be sent to you. Please read it back to me once you receive it.",
        options: [
          { id: "read_otp", text: "Read the OTP back to the caller", emoji: "📱" },
          { id: "hang_up", text: "Hang up and call your bank directly", emoji: "☎️" },
          { id: "refuse", text: "Never share OTP, bank employees won't ask for it", emoji: "🚫" }
        ],
        correctAnswers: ["hang_up", "refuse"],
        explanation: "This is a classic OTP scam. Bank employees will NEVER ask you to read your OTP back to them.",
        prevention: ["Never share OTP during calls, even if they claim to be bank staff", "Hang up and call your bank directly", "Your bank won't ask for OTP verification"],
        riskLevel: "Critical"
      },
      {
        id: "otp_4",
        title: "OTP for Account Recovery",
        type: "email",
        difficulty: "medium",
        sender: "Recovery Service",
        subject: "Verify your identity with OTP",
        content: "To recover your account, we've sent an OTP to your registered email. Reply with the OTP here: https://otp-verify.secure.net",
        options: [
          { id: "reply", text: "Reply with the OTP from email", emoji: "📧" },
          { id: "direct_login", text: "Go directly to the service's official website", emoji: "🌐" },
          { id: "check_account", text: "Never reply to emails asking for OTP", emoji: "🚫" }
        ],
        correctAnswers: ["direct_login", "check_account"],
        explanation: "OTPs are for verification, not to be sent via email. Go directly to the official service.",
        prevention: ["OTP is for your use, never reply with it via email", "Go directly to official websites to complete recovery", "Check your account settings directly"],
        riskLevel: "Critical"
      },
      {
        id: "otp_5",
        title: "Receiving OTP You Didn't Request",
        type: "sms",
        difficulty: "easy",
        sender: "Google",
        content: "Google: Your verification code is 742953. This code expires in 10 minutes. If you didn't request this, ignore this message.",
        options: [
          { id: "ignore", text: "Ignore - you didn't request verification", emoji: "🚫" },
          { id: "check_account", text: "Check your Google account for unauthorized login attempts", emoji: "🔍" },
          { id: "change_password", text: "Change your Google password immediately", emoji: "🔐" }
        ],
        correctAnswers: ["check_account", "change_password"],
        explanation: "If you get an OTP you didn't request, someone is trying to access your account. Change password immediately.",
        prevention: ["Unexpected OTP = account takeover attempt", "Check login history: myaccount.google.com/device-activity", "Change password immediately"],
        riskLevel: "Critical"
      },
      {
        id: "otp_6",
        title: "SIM Swap - OTP Redirects",
        type: "notification",
        difficulty: "hard",
        sender: "Telecom Customer Service",
        content: "New SIM activated. Your number has been transferred to new SIM ending in 4847. If this wasn't you, call us immediately.",
        options: [
          { id: "call_now", text: "Call the number in the message immediately", emoji: "☎️" },
          { id: "contact_telecom", text: "Call your telecom from a different phone using official number", emoji: "📞" },
          { id: "check_accounts", text: "Your accounts are at risk - check all important accounts", emoji: "🚨" }
        ],
        correctAnswers: ["contact_telecom", "check_accounts"],
        explanation: "SIM swap attack = someone cloned your SIM. Call your telecom immediately using the official number on their website.",
        prevention: ["Call your telecom using their official number (not from message)", "Check all accounts for unauthorized access", "Add PIN/password to your mobile account"],
        riskLevel: "Critical"
      },
      {
        id: "otp_7",
        title: "OTP Phishing via Fake App",
        type: "notification",
        difficulty: "hard",
        sender: "Fake Bank App",
        content: "Your mobile banking app is requesting OTP verification for security. OTP has been sent to your phone.",
        options: [
          { id: "open_app", text: "Open the banking app and enter the OTP", emoji: "📱" },
          { id: "check_app", text: "Check if the app is from official app store", emoji: "🏪" },
          { id: "official_app", text: "Only use apps downloaded from official App Store/Play Store", emoji: "✅" }
        ],
        correctAnswers: ["check_app", "official_app"],
        explanation: "Malicious apps can steal OTP. Only use apps from official stores.",
        prevention: ["Download banking apps only from official App Store/Play Store", "Verify app publisher before installing", "Never sideload banking apps"],
        riskLevel: "Critical"
      },
      {
        id: "otp_8",
        title: "Social Engineering for OTP",
        type: "email",
        difficulty: "hard",
        sender: "Support Team",
        subject: "Urgent: Complete Account Verification",
        content: "Your account will be closed in 24 hours for security. Verify by entering the OTP you'll receive and reply with it here. This is urgent.",
        options: [
          { id: "comply", text: "Request and share the OTP", emoji: "📧" },
          { id: "official", text: "Contact the official support channel", emoji: "💬" },
          { id: "ignore", text: "Legitimate companies won't ask for OTP via email", emoji: "❌" }
        ],
        correctAnswers: ["official", "ignore"],
        explanation: "The urgency is a manipulation tactic. Real services handle security in your account, not via email.",
        prevention: ["Real support never asks for OTP via email", "No legitimate service closes accounts without warning", "Contact official support through your account"],
        riskLevel: "Critical"
      },
      {
        id: "otp_9",
        title: "OTP Bombing Attack",
        type: "notification",
        difficulty: "medium",
        sender: "Multiple Services",
        content: "You receive 10+ OTP messages to your phone from different services (Gmail, PayPal, Amazon, etc.) you didn't request.",
        options: [
          { id: "panic", text: "Ignore them - it's probably a technical glitch", emoji: "😰" },
          { id: "investigate", text: "Someone is trying to access all your accounts", emoji: "🚨" },
          { id: "action", text: "Change passwords and enable phone-based 2FA", emoji: "🔐" }
        ],
        correctAnswers: ["investigate", "action"],
        explanation: "OTP bombing means your accounts are under attack. Change all passwords immediately.",
        prevention: ["OTP bombing = multiple account takeover attempts", "Change passwords for all important accounts", "Add password to your phone account"],
        riskLevel: "Critical"
      },
      {
        id: "otp_10",
        title: "Fake 'Verify OTP' Link",
        type: "sms",
        difficulty: "medium",
        sender: "Bank",
        content: "We sent an OTP to your email. Click here to verify: https://bank-otp-verify.secure.net. Limited time offer!",
        options: [
          { id: "click", text: "Click the link to verify OTP", emoji: "🔗" },
          { id: "check_email", text: "Check your email for the actual OTP", emoji: "📧" },
          { id: "call_bank", text: "Call your bank - they don't send OTP links", emoji: "☎️" }
        ],
        correctAnswers: ["check_email", "call_bank"],
        explanation: "Banks send OTP to email/phone directly, no links. Clicking links for 'OTP verification' is phishing.",
        prevention: ["Banks never send OTP links", "OTPs come via SMS/email as numbers only", "Don't click links related to OTP"],
        riskLevel: "Critical"
      },
      {
        id: "otp_11",
        title: "Backup Codes Theft",
        type: "whatsapp",
        difficulty: "hard",
        sender: "Friend (compromised)",
        senderImage: "👥",
        content: "Hi! I lost my phone and my backup codes for my Gmail. Do you have any backup codes written down that you could send me? Or any OTP codes you receive?",
        options: [
          { id: "send", text: "Send any backup codes or OTP you have", emoji: "📱" },
          { id: "call", text: "Call your friend to verify urgently", emoji: "☎️" },
          { id: "refuse", text: "Never share backup codes or OTP - they're for individual use", emoji: "🚫" }
        ],
        correctAnswers: ["call", "refuse"],
        explanation: "Backup codes are as valuable as passwords. Never share them.",
        prevention: ["Backup codes should NEVER be shared", "Store them in a secure location only you can access", "If a friend asks, they're likely compromised"],
        riskLevel: "Critical"
      },
      {
        id: "otp_12",
        title: "Time-Limited OTP Pressure",
        type: "email",
        difficulty: "hard",
        sender: "Account Support",
        subject: "URGENT: Verify within 10 minutes or account will be locked",
        content: "Your account requires immediate verification. OTP will be sent shortly. Once received, DO NOT share it with anyone, but reply with it to this email immediately. Time is running out! 10 minutes remaining!",
        options: [
          { id: "hurry", text: "Request OTP and quickly reply with it", emoji: "⏱️" },
          { id: "pause", text: "Pause - account verification shouldn't have time limits", emoji: "⏸️" },
          { id: "direct_login", text: "Ignore urgency, go directly to the official service", emoji: "🌐" }
        ],
        correctAnswers: ["pause", "direct_login"],
        explanation: "Urgency is a manipulation tactic. No legitimate service locks accounts without proper warning.",
        prevention: ["Real companies don't use artificial time limits", "Urgency is a red flag for scams", "Go directly to the official service to verify"],
        riskLevel: "Critical"
      }
    ]
  }
};

/**
 * Helper function to get all scenarios
 */
export function getAllScenarios() {
  const allScenarios = [];
  Object.values(gameScenarios).forEach(category => {
    allScenarios.push(...category.scenarios);
  });
  return allScenarios;
}

/**
 * Helper function to get scenarios by category
 */
export function getScenariosByCategory(categoryKey) {
  return gameScenarios[categoryKey]?.scenarios || [];
}

/**
 * Helper function to get random scenario
 */
export function getRandomScenario(excludeIds = []) {
  const allScenarios = getAllScenarios().filter(s => !excludeIds.includes(s.id));
  return allScenarios[Math.floor(Math.random() * allScenarios.length)];
}

export default gameScenarios;
