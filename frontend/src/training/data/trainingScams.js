export const trainingScams = {
    "ceo-fraud": {
        title: "AI CEO Fraud",
        type: "email",
        mockSender: "CEO <ceo.executive@company-secure-xyz.com>",
        mockSubject: "URGENT: Confidential Acquisition Transfer",
        mockBody: "I need you to process an immediate wire transfer for project Beta. Do not discuss this with anyone, it's highly confidential. Click the secure link below to process the $50,000 transfer immediately.",
        actionBad: "Process Transfer Link",
        actionGood: "Delete & Report",
        feedbackBad: { title: "Compromised!", icon: "💸", msg: "You just wired $50,000 to an attacker! They spoofed the CEO's writing style using AI." },
        feedbackGood: { title: "Excellent Defense!", icon: "🛡️", msg: "You identified the fraudulent sender address and urgent tone." },
        edu: {
            how: "Attackers use Generative AI to study a CEO's past communications and draft emails that perfectly mimic their tone, vocabulary, and sign-offs, completely bypassing traditional grammar-based spam filters.",
            flags: ["Urgent, secret request involving money.", "Sender email 'company-secure-xyz.com' is slightly off from the real domain.", "Bypassing normal payment protocols."],
            defense: "Always verify urgent financial requests via a secondary communication channel (e.g., call or Slack the CEO directly)."
        }
    },
    "mfa-alert": {
        title: "Fake MFA Alerts",
        type: "phone",
        mockSender: "GoogleSecurity",
        mockSubject: "Security Alert",
        mockBody: "Unauthorized login attempt blocked in Russia. If this wasn't you, secure your account immediately at https://account-google-auth.com/verify to prevent lock-out.",
        actionBad: "Click to Secure Account",
        actionGood: "Ignore text",
        feedbackBad: { title: "You've Been Phished!", icon: "🎣", msg: "That link went to a fake site. They now have your password AND your real 2FA code." },
        feedbackGood: { title: "Crisis Averted!", icon: "✅", msg: "You didn't panic and avoided a very convincing trap." },
        edu: {
            how: "Attackers trigger a real login attempt to send a real MFA prompt to your phone, but simultaneously send a fake SMS with a malicious link. When you click the fake link and log in, they steal the credentials and the MFA token you enter.",
            flags: ["The URL uses a hyphenated, fake domain ('account-google-auth.com').", "Creates immediate panic ('prevent lock-out')."],
            defense: "Never click links in security alerts. Navigate to the service directly via the app or your browser bookmark to check security logs."
        }
    },
    "clone-phishing": {
        title: "Clone Phishing",
        type: "email",
        mockSender: "Vendor Services <billing@trusted-vendor.com>",
        mockSubject: "UPDATED Invoice #99341",
        mockBody: "Attached is the invoice we discussed last week. Note: We have updated our banking details. Please send the payment to the new routing number in the attached PDF.",
        actionBad: "Download Invoice PDF",
        actionGood: "Call Vendor to Verify",
        feedbackBad: { title: "Infection Detected!", icon: "🐛", msg: "The PDF contained malware, and you just sent money to a fraudulent account." },
        feedbackGood: { title: "Smart Move!", icon: "📞", msg: "Verifying changed payment details via phone is exactly the right protocol." },
        edu: {
            how: "Attackers compromise an employee's email account, find old, legitimate emails (like real invoices), and 'clone' them to send a follow-up email from the trusted account. They simply swap the attachment with malware or change the bank routing details.",
            flags: ["Sudden change in banking details.", "Unexpected 'update' to an already settled conversation."],
            defense: "Treat any change in payment instructions as highly suspicious. Always verify via a known, trusted phone number."
        }
    },
    "astaroth": {
        title: "Astaroth Banking Trojan",
        type: "whatsapp",
        mockSender: "Unknown Number",
        mockSubject: "",
        mockBody: "Hey, are these your holiday photos? They were leaked online! Download the zip to check: [Photos.zip]",
        actionBad: "Download & Extract ZIP",
        actionGood: "Block Number",
        feedbackBad: { title: "Trojan Executed!", icon: "☠️", msg: "Astaroth is now running 'filelessly' on your system, logging your keystrokes." },
        feedbackGood: { title: "Threat Blocked!", icon: "🛡️", msg: "You avoided a dangerous social engineering trap." },
        edu: {
            how: "Astaroth operates without installing traditional executable (.exe) files. Instead, when you extract the ZIP, it hijacks built-in Windows administrative tools (like WMI and BITSAdmin) to hide in the background, making it invisible to many basic antiviruses while it steals banking logins.",
            flags: ["Unsolicited ZIP file from an unknown contact.", "Emotional manipulation ('photos leaked')."],
            defense: "Never download ZIP or RAR files from untrusted sources, particularly on messaging apps. Use advanced Endpoint Detection & Response (EDR) tools."
        }
    },
    "trojan-im": {
        title: "Trojan-IM App Hijack",
        type: "web",
        mockSender: "Telegram Desktop Updater",
        mockSubject: "Software Update Required",
        mockBody: "Critical security patch available for Telegram Desktop. Update now to continue using the service without interruption. [Download Update.exe]",
        actionBad: "Install Update",
        actionGood: "Close Browser Tab",
        feedbackBad: { title: "Account Hijacked!", icon: "📱", msg: "The Trojan-IM malware has stolen your active session tokens." },
        feedbackGood: { title: "Safe Choice!", icon: "✅", msg: "You only update software through official channels." },
        edu: {
            how: "Trojan-IM specifically hunts for session files and databases used by messaging apps (WhatsApp Desktop, Telegram, Skype) stored locally on your PC. By stealing these tokens, attackers can duplicate your session on their own machines without needing a password or SMS verification code.",
            flags: ["Prompt to download an '.exe' outside of the official website/app store.", "Threat of 'service interruption'."],
            defense: "Always update applications directly from inside the app itself or via the official Microsoft/Apple store."
        }
    },
    "whatsapp-gold": {
        title: "WhatsApp Gold Hoax",
        type: "whatsapp",
        mockSender: "Forwarded Message",
        mockSubject: "",
        mockBody: "Exclusive invite to WhatsApp Gold! Get deleted messages, custom themes, and unlimited media sizes. Click here to upgrade your WhatsApp account instantly: [whatsapp-gold-apk.net]",
        actionBad: "Install WhatsApp Gold",
        actionGood: "Report & Delete",
        feedbackBad: { title: "Malware Installed!", icon: "🦠", msg: "Your device is now infected with aggressive adware and spyware." },
        feedbackGood: { title: "Dodged a Bullet!", icon: "🚫", msg: "You know that official apps don't distribute updates via secret links." },
        edu: {
            how: "This is a classic 'promises of exclusivity' scam. WhatsApp Gold does not exist. The provided APK file is a wrapper that installs severe malware, giving attackers access to your contacts, camera, and microphone.",
            flags: ["Offers 'deleted features' that violate platform rules.", "Downloads via third-party websites instead of Google Play/App Store."],
            defense: "Only ever install applications from official marketplaces (Google Play Store, Apple App Store). Avoid 'modded' APKs at all costs."
        }
    },
    "smishing": {
        title: "Account Limitation Smishing",
        type: "phone",
        mockSender: "PayPal-Support",
        mockSubject: "Alert",
        mockBody: "Your account has been temporarily restricted due to suspicious activity. Please verify your identity within 24 hours at http://bit.ly/pp-verify-8x92 or your account will be permanently locked.",
        actionBad: "Click Link to Verify",
        actionGood: "Delete SMS",
        feedbackBad: { title: "Credentials Stolen!", icon: "💳", msg: "You just handed your PayPal login directly to the scammers." },
        feedbackGood: { title: "Good Job!", icon: "✅", msg: "You identified the manipulative urgency and the shortened URL." },
        edu: {
            how: "Smishing (SMS Phishing) relies on immediate panic. Because mobile screens are smaller, URLs are harder to scrutinize. Attackers use generic names like 'PayPal-Support' which phones often group together with real alerts.",
            flags: ["Threat of permanent account closure.", "Use of URL shorteners (bit.ly, t.co) to hide the real destination."],
            defense: "If you receive a panic-inducing text about a suspended account, manually open your browser, type in the real website URL independently, and log in to check your status."
        }
    },
    "delivery-scam": {
        title: "Package Delivery Scams",
        type: "phone",
        mockSender: "UPS-Alerts",
        mockSubject: "Delivery Failed",
        mockBody: "Your package is waiting at our depot. Delivery failed due to unpaid shipping customs. Pay the $1.99 fee to schedule redelivery: https://ups-customs-fee-portal.com",
        actionBad: "Pay $1.99 Fee",
        actionGood: "Ignore text",
        feedbackBad: { title: "Credit Card Stolen!", icon: "💳", msg: "They didn't want the $1.99. They wanted your entire credit card number for fraud." },
        feedbackGood: { title: "Saved your wallet!", icon: "✅", msg: "You recognized a classic low-fee credit card harvesting scam." },
        edu: {
            how: "Scammers ask for a trivially small amount of money ($1 to $3) so the victim doesn't hesitate to pay. The fake payment portal then harvests the victim's full credit card details, CVV, and address to commit massive card fraud later.",
            flags: ["Unexpected package notifications.", "Requests for tiny 'processing' or 'customs' fees via a link."],
            defense: "Official carriers will leave a physical card at your door or update the tracking number in your official app. Never pay a delivery fee through an SMS link."
        }
    },
    "ghost-pairing": {
        title: "GhostPairing WhatsApp Scam",
        type: "whatsapp",
        mockSender: "Acquaintance",
        mockSubject: "",
        mockBody: "Hey, is this you in this photo?! Looks crazy! I uploaded it here to show you: https://view-gallery-images.net. Tell me it's not you lol",
        actionBad: "Click to see photo",
        actionGood: "Text them back asking what it is",
        feedbackBad: { title: "Account Cloned!", icon: "👻", msg: "That link passed a WhatsApp Web pairing request. They now mirror your account." },
        feedbackGood: { title: "Smart Verification!", icon: "✅", msg: "Asking for context often exposes that the sender is a bot or hacked." },
        edu: {
            how: "The link directs you to a fake website that, in the background, triggers a WhatsApp Web pairing request using a QR code hidden in the page structure. If you accidentally approve it thinking you're just viewing a photo, the attacker connects a new device to your account.",
            flags: ["Vague, curiosity-inducing messages ('Is this you?').", "Unusual links from people who don't normally send links."],
            defense: "Regularly check 'Linked Devices' in your WhatsApp settings and log out of anything you don't recognize. Avoid clicking vague links."
        }
    },
    "friend-scam": {
        title: "Friend-in-Need Scam",
        type: "social",
        mockSender: "Sarah (Close Friend)",
        mockSubject: "Facebook Messenger",
        mockBody: "Hey... I'm really in a bind. My purse was stolen on vacation and I need to pay for my hotel right now. Can you Zelle me $200? I promise I'll pay you back on Tuesday.",
        actionBad: "Send $200 via Zelle",
        actionGood: "Call Sarah's Phone",
        feedbackBad: { title: "Money Lost!", icon: "💸", msg: "Sarah's account was hacked. You just sent money to a scammer." },
        feedbackGood: { title: "Perfect Protocol!", icon: "📞", msg: "Calling the person out-of-band is the safest way to verify emotional pleas." },
        edu: {
            how: "Scammers break into a real social media account using reused passwords. They then message all friends and family with an urgent, believable crisis. Because the message comes from a trusted identity, victims let their guard down.",
            flags: ["Sudden, intense emergencies requesting untraceable cash apps (Zelle, Crypto, Gift Cards).", "Excuses for why they 'can't talk on the phone right now'."],
            defense: "Always mandate a voice or video call before sending money to a friend in an 'emergency'. If they refuse, it's likely a scam."
        }
    },
    "steganography": {
        title: "Steganography Image Payload",
        type: "web",
        mockSender: "Design Forum",
        mockSubject: "Check out this texture",
        mockBody: "Hey designers, I made this cool high-res abstract texture. Feel free to download and use it in your projects: [Abstract-Texture.png]",
        actionBad: "Download & Open Image",
        actionGood: "Ignore file",
        feedbackBad: { title: "Silent Infection!", icon: "🖼️", msg: "The image contained malicious code hidden inside the pixels." },
        feedbackGood: { title: "Safe!", icon: "✅", msg: "You avoided downloading unverified attachments from forums." },
        edu: {
            how: "Steganography is the practice of concealing data within something else. Attackers hide malicious scripts within the Least Significant Bits (LSB) of image pixels. When a seemingly innocent image viewer or vulnerable platform processes the image, the script triggers and downloads malware.",
            flags: ["Hard to detect visually.", "Usually targets forums, Discord servers, or freelance platforms where file exchange is normal."],
            defense: "Keep all image viewers and operating systems updated to patch parser vulnerabilities. Disable auto-downloading of media in chat applications."
        }
    },
    "payment-fraud": {
        title: "Payment Gateway Spoofing",
        type: "email",
        mockSender: "Stripe Automated <support@strlpe-billing.com>",
        mockSubject: "ACTION REQUIRED: KYC Verification",
        mockBody: "Your merchant account requires immediate KYC (Know Your Customer) re-verification. Failure to upload your ID and Banking details within 12 hours will result in permanent fund freezing.",
        actionBad: "Upload KYC Documents",
        actionGood: "Mark as Spam",
        feedbackBad: { title: "Identity Theft!", icon: "🎭", msg: "You just handed comprehensive KYC documents directly to an identity thief." },
        feedbackGood: { title: "Crisis Averted!", icon: "✅", msg: "You noticed the spoofed domain name." },
        edu: {
            how: "Attackers spoof major payment processors (Stripe, Razorpay, PayPal) to target small business owners and freelancers. Because the thread is to freeze business funds, victims panic and provide highly sensitive documents (Passports, SSNs).",
            flags: ["Domain impersonation ('strlpe' instead of 'stripe').", "Threats of immediate, catastrophic business interruption (frozen funds)."],
            defense: "Never handle KYC or billing disputes through email links. Always log into the merchant dashboard directly to verify if documents are actually requested."
        }
    }
};

export default trainingScams;
