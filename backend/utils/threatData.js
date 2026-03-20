/**
 * Comprehensive Cyber Threat Database
 * 10+ categories with 10+ realistic examples each
 */

const threatCategories = {
  phishing: {
    title: "Phishing & Email Attacks",
    examples: [
      {
        id: "fake-bank-login",
        title: "Fake Bank Login Portal",
        description:
          "Receive email claiming your account is locked, directing you to fake banking portal that captures credentials.",
        riskLevel: "High",
        prevention: [
          "Always navigate to bank websites directly by typing the URL",
          "Check sender email domain carefully",
          "Banks never ask for passwords via email",
        ],
        cveExample: null,
      },
      {
        id: "paypal-verification",
        title: "PayPal Account Verification Scam",
        description:
          "Phishing email claiming unauthorized access and requesting immediate account verification to prevent suspension.",
        riskLevel: "High",
        prevention: [
          "Log into PayPal directly (don't click email links)",
          "PayPal won't ask for sensitive data via email",
          "Check account activity in official dashboard",
        ],
        cveExample: null,
      },
      {
        id: "amazon-order-fake",
        title: "Fake Amazon Order Notification",
        description:
          "Email with fake Amazon invoice for expensive items, requesting to click link to cancel or confirm order.",
        riskLevel: "Medium",
        prevention: [
          "Check your actual Amazon order history",
          "Amazon links should go to amazon.com domain",
          "Call Amazon support if suspicious",
        ],
        cveExample: null,
      },
      {
        id: "apple-id-reset",
        title: "Apple ID Password Reset Phish",
        description:
          "Email claiming unusual activity detected, requesting to reset Apple ID password via malicious link.",
        riskLevel: "High",
        prevention: [
          "Go to iCloud.com or Apple.com directly",
          "Never click links in security emails",
          "Use 2FA to secure Apple ID",
        ],
        cveExample: null,
      },
      {
        id: "google-account-recovery",
        title: "Google Account Recovery Scam",
        description:
          "Email claiming account recovery required, redirects to fake Google login page.",
        riskLevel: "High",
        prevention: [
          "Visit accounts.google.com directly",
          "Check Google's official recovery page",
          "Enable 2FA on Gmail account",
        ],
        cveExample: null,
      },
      {
        id: "microsoft-office-update",
        title: "Microsoft Office Update Phishing",
        description:
          "Email claiming critical Office 365 update required, contains malicious attachment or link.",
        riskLevel: "High",
        prevention: [
          "Microsoft updates automatically via genuine Office",
          "Check Microsoft.com for official updates",
          "Never download Office from email links",
        ],
        cveExample: null,
      },
      {
        id: "linkedin-job-scam",
        title: "LinkedIn Job Offer Phishing",
        description:
          "Email impersonating recruiter with fake job offer, requests personal/financial information.",
        riskLevel: "Medium",
        prevention: [
          "Verify job postings on LinkedIn directly",
          "Check company website careers page",
          "Never provide banking info for job applications",
        ],
        cveExample: null,
      },
      {
        id: "netflix-billing-alert",
        title: "Netflix Billing Alert Phishing",
        description:
          "Email notifying of billing problem, directs to fake Netflix login to update payment method.",
        riskLevel: "Medium",
        prevention: [
          "Log into Netflix app directly",
          "Update payment in official settings",
          "Netflix emails have specific formatting",
        ],
        cveExample: null,
      },
      {
        id: "airline-ticket-scam",
        title: "Airline Ticket Confirmation Fake",
        description:
          "Email with fake flight confirmation, requests re-confirmation through phishing link.",
        riskLevel: "Medium",
        prevention: [
          "Check booking in airline's official app/site",
          "Airlines send confirmations from official domains",
          "Never re-verify through external links",
        ],
        cveExample: null,
      },
      {
        id: "tax-return-phishing",
        title: "IRS Tax Refund Scam",
        description:
          "Email claiming tax refund is ready, requests personal information and banking details.",
        riskLevel: "High",
        prevention: [
          "IRS communicates by mail, never email",
          "Visit IRS.gov to check refund status",
          "Never provide SSN or banking info via email",
        ],
        cveExample: null,
      },
      {
        id: "crypto-exchange-hack",
        title: "Crypto Exchange Account Compromised",
        description:
          "Email claiming account hacked, requesting immediate password reset via scam link.",
        riskLevel: "High",
        prevention: [
          "Enable 2FA on all crypto exchange accounts",
          "Visit exchange directly, don't use email link",
          "Use hardware wallets for large holdings",
        ],
        cveExample: null,
      },
    ],
  },

  malware: {
    title: "Malware & Trojans",
    examples: [
      {
        id: "banking-trojan-nemty",
        title: "Nemty Banking Trojan",
        description:
          "Malware that intercepts banking sessions and steals credentials, uses polymorphic code to evade antivirus.",
        riskLevel: "High",
        prevention: [
          "Keep antivirus software updated",
          "Don't download files from untrusted sources",
          "Use multi-factor authentication on banking apps",
          "Monitor bank accounts for unusual activity",
        ],
        cveExample: "CVE-2019-3568",
      },
      {
        id: "emotet-worm",
        title: "Emotet Botnet Worm",
        description:
          "Self-propagating malware that spreads via email attachments, installs backdoors and ransomware.",
        riskLevel: "High",
        prevention: [
          "Don't open unexpected email attachments",
          "Disable macros in Office documents",
          "Keep Windows and software patched",
          "Use network segmentation",
        ],
        cveExample: "CVE-2017-11882",
      },
      {
        id: "zeus-keylogger",
        title: "Zeus Keylogger",
        description:
          "Keylogging malware that records every keystroke, captures banking credentials and sensitive data.",
        riskLevel: "High",
        prevention: [
          "Use password managers instead of typing",
          "Install reputable antimalware software",
          "Use on-screen keyboards for sensitive transactions",
          "Keep operating system fully patched",
        ],
        cveExample: null,
      },
      {
        id: "stuxnet-worm",
        title: "Stuxnet SCADA Attack",
        description:
          "Advanced worm targeting industrial control systems, manipulates SCADA software for critical infrastructure.",
        riskLevel: "Critical",
        prevention: [
          "Air-gap critical infrastructure networks",
          "Implement strict access controls",
          "Monitor SCADA systems closely",
          "Deploy IDS/IPS solutions",
        ],
        cveExample: "CVE-2010-2568",
      },
      {
        id: "conficker-worm",
        title: "Conficker Worm",
        description:
          "Self-replicating worm affecting Windows systems, disables security software and spreads via USB drives.",
        riskLevel: "High",
        prevention: [
          "Apply security patches immediately",
          "Disable autorun on USB devices",
          "Use updated antivirus",
          "Regular system scans",
        ],
        cveExample: "CVE-2008-4250",
      },
      {
        id: "mirai-botnet",
        title: "Mirai IoT Botnet",
        description:
          "Malware infecting IoT devices with weak credentials, used to launch massive DDoS attacks.",
        riskLevel: "High",
        prevention: [
          "Change default IoT device credentials",
          "Update firmware regularly",
          "Disable unused IoT features",
          "Segment IoT devices from critical networks",
        ],
        cveExample: null,
      },
      {
        id: "turla-spyware",
        title: "Turla Spyware",
        description:
          "Advanced spyware targeting governments and corporations, uses sophisticated anti-analysis techniques.",
        riskLevel: "Critical",
        prevention: [
          "Use advanced endpoint detection",
          "Monitor network for C2 communications",
          "Implement strict code signing policies",
          "Use behavioral analysis tools",
        ],
        cveExample: null,
      },
      {
        id: "wannacry-ransomware",
        title: "WannaCry Ransomware",
        description:
          "Worm-like ransomware exploiting Windows vulnerability, encrypts files and demands Bitcoin payment.",
        riskLevel: "Critical",
        prevention: [
          "Patch MS17-010 immediately",
          "Maintain offline backups",
          "Disable SMB file sharing if unused",
          "Use network segmentation",
          "Deploy EDR solutions",
        ],
        cveExample: "CVE-2017-0144",
      },
      {
        id: "polymorphic-virus",
        title: "Polymorphic Virus Engine",
        description:
          "Malware that changes its code each infection, evades signature-based antivirus detection.",
        riskLevel: "High",
        prevention: [
          "Use behavioral/heuristic antivirus",
          "Keep antivirus updated",
          "Limit administrative privileges",
          "Monitor system behavior",
        ],
        cveExample: null,
      },
      {
        id: "rootkit-kernel",
        title: "Kernel-Level Rootkit",
        description:
          "Malware installing at OS kernel level, grants permanent backdoor access and hides its presence.",
        riskLevel: "Critical",
        prevention: [
          "Boot Secure Boot on Windows/UEFI",
          "Use kernel-aware security tools",
          "Monitor system processes constantly",
          "Perform periodic clean OS reinstalls",
        ],
        cveExample: null,
      },
    ],
  },

  ransomware: {
    title: "Ransomware Attacks",
    examples: [
      {
        id: "lockbit-ransomware",
        title: "LockBit Ransomware Gang",
        description:
          "Fastest-growing ransomware operation, uses double-extortion technique (encryption + data theft).",
        riskLevel: "Critical",
        prevention: [
          "Maintain offline, immutable backups",
          "Isolate critical systems",
          "Monitor for lateral movement",
          "Implement zero-trust network",
        ],
        cveExample: null,
      },
      {
        id: "conti-ransomware",
        title: "Conti Ransomware as a Service",
        description:
          "Sophisticated RaaS platform used by multiple threat actors, targets large enterprises for maximum ransom.",
        riskLevel: "Critical",
        prevention: [
          "Segment networks by criticality",
          "Deploy EDR on all endpoints",
          "Monitor for data exfiltration",
          "Establish incident response plan",
        ],
        cveExample: null,
      },
      {
        id: "blackmatter-ransomware",
        title: "BlackMatter Ransomware",
        description:
          "Successor to DarkSide, targets healthcare and critical infrastructure, uses advanced anti-forensics.",
        riskLevel: "Critical",
        prevention: [
          "Backup critical data offline",
          "Monitor for execution of unknown executables",
          "Implement strict firewall rules",
          "Use YARA rules for detection",
        ],
        cveExample: null,
      },
      {
        id: "revil-sodinokibi",
        title: "REvil/Sodinokibi Ransomware",
        description:
          "Ransomware-as-a-Service operation, leaked Kaseya exploit affects thousands of businesses.",
        riskLevel: "Critical",
        prevention: [
          "Keep software patched (especially CVE-2021-30116)",
          "Restrict RDP access",
          "Monitor command execution",
          "Implement application whitelisting",
        ],
        cveExample: "CVE-2021-30116",
      },
      {
        id: "ryuk-ransomware",
        title: "Ryuk Ransomware Campaign",
        description:
          "Often deployed after Emotet and TrickBot infections, targets business networks for large ransom demands.",
        riskLevel: "Critical",
        prevention: [
          "Remove Emotet/TrickBot first",
          "Disable macro execution in Office",
          "Implement tier-based access controls",
          "Monitor lateral movement patterns",
        ],
        cveExample: null,
      },
      {
        id: "petya-notpetya",
        title: "Petya/NotPetya Disk Encryption",
        description:
          "Worm-like ransomware targeting Master Boot Record, spreads via network shares and PSExec.",
        riskLevel: "Critical",
        prevention: [
          "Disable PSExec and WMI for users",
          "Patch EternalBlue vulnerability",
          "Use MBR protection tools",
          "Monitor for code execution via WMI",
        ],
        cveExample: "CVE-2017-0199",
      },
      {
        id: "maze-ransomware",
        title: "Maze Ransomware Gang",
        description:
          "First gang to routinely publish stolen data, operates bug bounty program to find vulnerabilities.",
        riskLevel: "Critical",
        prevention: [
          "Assume breach mentality",
          "Monitor data exfiltration channels",
          "Implement strict DLP policies",
          "Segment sensitive data stores",
        ],
        cveExample: null,
      },
      {
        id: "darkside-ransomware",
        title: "DarkSide Ransomware (Colonial Pipeline)",
        description:
          "Targeted energy sector, caused major fuel pipeline shutdown, demonstrates critical infrastructure risk.",
        riskLevel: "Critical",
        prevention: [
          "Monitor for suspicious VPN access",
          "Implement multi-factor authentication",
          "Audit privileged account activity",
          "Maintain immutable backups",
        ],
        cveExample: null,
      },
      {
        id: "cerber-ransomware",
        title: "Cerber Ransomware",
        description:
          "RaaS model using browser exploits, distributes through malicious ads and compromised websites.",
        riskLevel: "High",
        prevention: [
          "Keep browser and plugins updated",
          "Use browser security extensions",
          "Disable auto-play content",
          "Monitor for suspicious file encryption",
        ],
        cveExample: null,
      },
      {
        id: "crysis-dharma",
        title: "Crysis/Dharma Ransomware",
        description:
          "File-encrypting ransomware often deployed via RDP exploitation, targets small-medium businesses.",
        riskLevel: "High",
        prevention: [
          "Restrict and monitor RDP access",
          "Use VPN with 2FA for remote access",
          "Scan for open RDP ports",
          "Enable RDP NLA (Network Level Authentication)",
        ],
        cveExample: null,
      },
    ],
  },

  socialEngineering: {
    title: "Social Engineering Attacks",
    examples: [
      {
        id: "pretexting-hr",
        title: "Pretexting HR Personnel",
        description:
          "Attacker impersonates IT/Executive, tricks HR into changing payroll direct deposit to attacker's account.",
        riskLevel: "High",
        prevention: [
          "Implement verification protocols for account changes",
          "Require multi-step confirmation for payroll changes",
          "Regular security training for HR staff",
          "Use secure out-of-band verification",
        ],
        cveExample: null,
      },
      {
        id: "vishing-it-support",
        title: "Vishing IT Support Scam",
        description:
          "Attacker calls pretending to be IT support, convinces user to install remote access tool or share credentials.",
        riskLevel: "High",
        prevention: [
          "Never share credentials or remote access without verification",
          "Call back IT support through known channels",
          "Question unexpected IT support requests",
          "Implement call-back verification procedures",
        ],
        cveExample: null,
      },
      {
        id: "tailgating-physical",
        title: "Tailgating/Piggybacking Access",
        description:
          "Attacker follows authorized employee through secure doors, gains physical access to restricted areas.",
        riskLevel: "High",
        prevention: [
          "Enforce no-piggybacking policies",
          "Use mantrap doors/security gates",
          "Require badge for every entry",
          "Train employees on security awareness",
        ],
        cveExample: null,
      },
      {
        id: "baiting-usb",
        title: "Baiting with Infected USB Drives",
        description:
          "Attacker leaves USB drive in parking lot or public area labeled 'Salary Increase', user plugs in infected drive.",
        riskLevel: "High",
        prevention: [
          "Disable autorun on USB devices",
          "Scan all external media before using",
          "Educate users not to plug in unknown devices",
          "Use device whitelisting",
        ],
        cveExample: null,
      },
      {
        id: "dumpster-diving",
        title: "Dumpster Diving for Company Info",
        description:
          "Attacker recovers sensitive documents from trash, uses information to conduct targeted attacks.",
        riskLevel: "Medium",
        prevention: [
          "Implement document shredding policy",
          "Use secure waste disposal",
          "Classify sensitive documents clearly",
          "Train employees on data disposal",
        ],
        cveExample: null,
      },
      {
        id: "reverse-social-engineer",
        title: "Reverse Social Engineering",
        description:
          "Attacker first damages systems, then calls posing as tech support to 'fix' issues and gain access.",
        riskLevel: "High",
        prevention: [
          "Verify support requests independently",
          "Monitor for suspicious activity first",
          "Use known approved support channels",
          "Never grant access to unverified support",
        ],
        cveExample: null,
      },
      {
        id: "quid-pro-quo",
        title: "Quid Pro Quo Attack",
        description:
          "Attacker offers something valuable (discount, gift card) in exchange for sensitive information or access.",
        riskLevel: "Medium",
        prevention: [
          "Never trade security for conveniences",
          "Suspicious offers should be reported",
          "Clear policies on information sharing",
          "Regular security awareness training",
        ],
        cveExample: null,
      },
      {
        id: "impersonation-authority",
        title: "Impersonation of Authority Figure",
        description:
          "Attacker impersonates CEO, manager, or law enforcement to pressure employee into compliance.",
        riskLevel: "High",
        prevention: [
          "Verify authority through known channels",
          "Question unusual urgent requests",
          "No verification = no compliance",
          "Document and report incidents",
        ],
        cveExample: null,
      },
      {
        id: "consensus-bandwagon",
        title: "Consensus/Bandwagon Social Engineering",
        description:
          "Attacker claims 'everyone else in department did this', manipulates target through peer pressure.",
        riskLevel: "Medium",
        prevention: [
          "Verify claims through official channels",
          "Build security culture resistant to peer pressure",
          "Anonymous reporting mechanisms",
          "Management support for security decisions",
        ],
        cveExample: null,
      },
      {
        id: "sob-story-appeal",
        title: "Sob Story Emotional Appeal",
        description:
          "Attacker creates emotional narrative (medical emergency, family crisis) to bypass security protocols.",
        riskLevel: "Medium",
        prevention: [
          "Empathize but verify",
          "Follow protocols regardless of story",
          "Document all exceptions",
          "Escalate to management for approval",
        ],
        cveExample: null,
      },
    ],
  },

  passwordAttacks: {
    title: "Password & Credential Attacks",
    examples: [
      {
        id: "brute-force-ssh",
        title: "SSH Brute Force Attack",
        description:
          "Attacker tries thousands of password combinations against SSH service, eventually gains access.",
        riskLevel: "High",
        prevention: [
          "Disable password authentication, use SSH keys only",
          "Change default SSH port",
          "Implement fail2ban or rate limiting",
          "Monitor failed login attempts",
        ],
        cveExample: null,
      },
      {
        id: "dictionary-attack",
        title: "Dictionary Attack with Common Words",
        description:
          "Uses lists of common passwords and variations, faster than random brute force.",
        riskLevel: "High",
        prevention: [
          "Enforce strong, unique passwords",
          "Use password complexity requirements",
          "Implement account lockout after failed attempts",
          "Use passphrases instead of passwords",
        ],
        cveExample: null,
      },
      {
        id: "credential-stuffing",
        title: "Credential Stuffing from Data Breaches",
        description:
          "Attacker uses stolen credentials from one breach against multiple services (password reuse problem).",
        riskLevel: "High",
        prevention: [
          "Use unique passwords for each service",
          "Enable multi-factor authentication",
          "Use password manager to avoid reuse",
          "Monitor for breach notifications",
        ],
        cveExample: null,
      },
      {
        id: "rainbow-table-attack",
        title: "Rainbow Table Hash Attack",
        description:
          "Pre-computed hash tables used to reverse weak password hashes, cracks common passwords instantly.",
        riskLevel: "High",
        prevention: [
          "Systems should use salted hashing",
          "Use bcrypt, Argon2, or scrypt for hashing",
          "Never use MD5 or SHA1 for passwords",
          "Ensure proper key derivation functions",
        ],
        cveExample: null,
      },
      {
        id: "keylogger-password",
        title: "Keylogger Captures Password Entry",
        description:
          "Malware records every keystroke, including when user types passwords.",
        riskLevel: "High",
        prevention: [
          "Use password managers for entry",
          "Use on-screen keyboards for sensitive data",
          "Keep antimalware updated",
          "Use multi-factor authentication",
        ],
        cveExample: null,
      },
      {
        id: "password-spraying",
        title: "Password Spraying Attack",
        description:
          "Attacker uses single password against many accounts (e.g., 'Password123'), slower to detect.",
        riskLevel: "High",
        prevention: [
          "Enforce strong password policies",
          "Monitor for unusual login patterns",
          "Implement anomaly detection",
          "Use conditional access rules",
        ],
        cveExample: null,
      },
      {
        id: "shoulder-surfing",
        title: "Shoulder Surfing Password Entry",
        description:
          "Attacker visually observes password being typed, common in public places.",
        riskLevel: "Medium",
        prevention: [
          "Type passwords where others can't see",
          "Use privacy screens in public",
          "Cover keyboard while typing",
          "Use biometric authentication when possible",
        ],
        cveExample: null,
      },
      {
        id: "password-database-dump",
        title: "Database Dump Extraction",
        description:
          "Attacker dumps entire password database from vulnerable application, exposing thousands of credentials.",
        riskLevel: "Critical",
        prevention: [
          "Implement SQL injection protections",
          "Use parameterized queries",
          "Enforce least privilege on DB accounts",
          "Encrypt sensitive data at rest",
        ],
        cveExample: "CVE-2019-9193",
      },
      {
        id: "man-in-the-middle-password",
        title: "Man-in-the-Middle Password Capture",
        description:
          "Attacker intercepts unencrypted password transmission, captures credentials in transit.",
        riskLevel: "Critical",
        prevention: [
          "Always use HTTPS/TLS encryption",
          "Never transmit passwords over HTTP",
          "Use VPN on public WiFi",
          "Verify SSL certificates",
        ],
        cveExample: null,
      },
      {
        id: "otp-bypass",
        title: "OTP Time-Based Bypass Attack",
        description:
          "Attacker manipulates time on device or exploits weak TOTP implementation to generate valid OTP codes.",
        riskLevel: "High",
        prevention: [
          "Use TOTP/HOTP with proper time synchronization",
          "Implement rate limiting on OTP attempts",
          "Use longer OTP codes (8 digits minimum)",
          "Backup codes should be stored securely",
        ],
        cveExample: null,
      },
    ],
  },

  ddosAttacks: {
    title: "DDoS & Network Attacks",
    examples: [
      {
        id: "udp-flood",
        title: "UDP Flood DDoS Attack",
        description:
          "Attacker floods target with massive UDP packets, overwhelms bandwidth and server resources.",
        riskLevel: "High",
        prevention: [
          "Use DDoS mitigation service (Cloudflare, AWS Shield)",
          "Implement rate limiting on network edge",
          "Configure firewall to drop UDP floods",
          "Use geo-blocking for non-relevant traffic",
        ],
        cveExample: null,
      },
      {
        id: "syn-flood",
        title: "SYN Flood Attack",
        description:
          "Attacker sends flood of SYN packets without completing TCP handshake, exhausts connection table.",
        riskLevel: "High",
        prevention: [
          "Enable SYN cookies on servers",
          "Implement SYN flood protection",
          "Use load balancers with DoS protection",
          "Configure firewall connection limits",
        ],
        cveExample: null,
      },
      {
        id: "dns-amplification",
        title: "DNS Amplification DDoS",
        description:
          "Attacker spoofs victim IP, sends DNS queries to open resolvers that amplify response size.",
        riskLevel: "High",
        prevention: [
          "Configure DNS servers for source validation",
          "Implement rate limiting on DNS queries",
          "Block DNS responses from being amplified",
          "Use anycast DNS distribution",
        ],
        cveExample: null,
      },
      {
        id: "ntp-amplification",
        title: "NTP Amplification Attack",
        description:
          "Exploits public NTP servers to amplify traffic toward victim, causes massive bandwidth drain.",
        riskLevel: "High",
        prevention: [
          "Restrict NTP to authorized clients",
          "Disable monlist command on NTP servers",
          "Implement rate limiting",
          "Use DDoS scrubbing centers",
        ],
        cveExample: null,
      },
      {
        id: "slowloris-attack",
        title: "Slowloris HTTP DoS",
        description:
          "Attacker sends incomplete HTTP requests, holds connections open, ties up server resources.",
        riskLevel: "Medium",
        prevention: [
          "Implement connection timeout policies",
          "Use reverse proxy (nginx) with timeout settings",
          "Monitor for unusual connection patterns",
          "Use WAF to detect Slowloris",
        ],
        cveExample: null,
      },
      {
        id: "http-get-flood",
        title: "HTTP GET Flood Attack",
        description:
          "Attacker sends thousands of legitimate-looking HTTP GET requests, overwhelming web server.",
        riskLevel: "Medium",
        prevention: [
          "Use rate limiting on per-IP basis",
          "Implement CAPTCHA challenges",
          "Use CDN with DDoS protection",
          "Monitor request patterns",
        ],
        cveExample: null,
      },
      {
        id: "ping-flood",
        title: "Ping Flood (ICMP) Attack",
        description:
          "Attacker sends massive number of ICMP echo requests, overwhelms target's network.",
        riskLevel: "Medium",
        prevention: [
          "Configure firewall to rate-limit ICMP",
          "Disable ICMP responses if not needed",
          "Use router ACLs to filter ICMP",
          "Monitor for ICMP flood patterns",
        ],
        cveExample: null,
      },
      {
        id: "botnet-mirai",
        title: "Botnet-Driven DDoS (Mirai-like)",
        description:
          "Compromised IoT devices launch coordinated DDoS from multiple sources simultaneously.",
        riskLevel: "Critical",
        prevention: [
          "Detect compromised devices early",
          "Use ISP-level DDoS mitigation",
          "Implement anomalous traffic detection",
          "Coordinate with ISP during attack",
        ],
        cveExample: null,
      },
      {
        id: "application-layer-ddos",
        title: "Application Layer DDoS",
        description:
          "Sophisticated attack targeting specific application functionality, appears as legitimate traffic.",
        riskLevel: "High",
        prevention: [
          "Use WAF with behavioral analysis",
          "Implement rate limiting per user/session",
          "Monitor application performance metrics",
          "Enable geo-blocking if applicable",
        ],
        cveExample: null,
      },
      {
        id: "reflection-attack",
        title: "Reflection & Amplification Attack",
        description:
          "Uses third-party servers to amplify and redirect traffic toward victim.",
        riskLevel: "High",
        prevention: [
          "Implement egress filtering (BCP38/RFC2827)",
          "Deploy traffic scrubbing centers",
          "Monitor for reflected traffic patterns",
          "Work with upstream ISP providers",
        ],
        cveExample: null,
      },
    ],
  },

  cloudSecurity: {
    title: "Cloud Security Risks",
    examples: [
      {
        id: "s3-bucket-misconfiguration",
        title: "S3 Bucket Publicly Accessible",
        description:
          "AWS S3 bucket misconfigured to allow public read access, exposes sensitive data (credentials, PII, backups).",
        riskLevel: "Critical",
        prevention: [
          "Enable S3 Block Public Access settings",
          "Use bucket policies with least privilege",
          "Enable S3 encryption (SSE-S3 or KMS)",
          "Enable versioning and MFA delete",
          "Monitor with CloudTrail and S3 access logs",
        ],
        cveExample: null,
      },
      {
        id: "azure-role-overprovisioning",
        title: "Azure Role-Based Access Control Overprovisioning",
        description:
          "Excessive permissions assigned to service principal, compromised principal has too much access.",
        riskLevel: "High",
        prevention: [
          "Apply principle of least privilege",
          "Use custom RBAC roles for specific needs",
          "Regular access reviews and audits",
          "Enable Azure AD conditional access",
          "Monitor for privileged access usage",
        ],
        cveExample: null,
      },
      {
        id: "gcp-service-account-leak",
        title: "GCP Service Account Key Leaked",
        description:
          "Service account key exposed in code repository, attacker uses key to access GCP resources.",
        riskLevel: "Critical",
        prevention: [
          "Rotate service account keys regularly",
          "Use secret management (Vault, GCP Secret Manager)",
          "Scan repositories for exposed keys",
          "Use Workload Identity instead of keys",
          "Monitor key usage and access patterns",
        ],
        cveExample: null,
      },
      {
        id: "cloud-api-misconfiguration",
        title: "Cloud API Default Credentials Not Changed",
        description:
          "Application uses default API credentials in production, readily accessible."
        ,
        riskLevel: "Critical",
        prevention: [
          "Never use default credentials in production",
          "Rotate credentials on deployment",
          "Use secrets management services",
          "Enforce credential rotation policies",
          "Audit and log API usage",
        ],
        cveExample: null,
      },
      {
        id: "data-exfiltration-cloud",
        title: "Data Exfiltration via Cloud Account Compromise",
        description:
          "Cloud account credentials compromised, attacker exports large volumes of data from databases.",
        riskLevel: "Critical",
        prevention: [
          "Enable MFA on all cloud accounts",
          "Monitor for large data exports",
          "Use VPN/bastion host for cloud access",
          "Encrypt databases and enable audit logging",
          "Implement egress filtering",
        ],
        cveExample: null,
      },
      {
        id: "container-escape",
        title: "Container Escape & Host Compromise",
        description:
          "Docker/Kubernetes container escape exploits kernel vulnerability, attacker gains host access.",
        riskLevel: "Critical",
        prevention: [
          "Keep container runtime patched",
          "Use read-only file systems when possible",
          "Drop unnecessary Linux capabilities",
          "Use seccomp/AppArmor/SELinux profiles",
          "Scan container images for vulnerabilities",
        ],
        cveExample: "CVE-2019-949",
      },
      {
        id: "kubernetes-rbac-bypass",
        title: "Kubernetes RBAC Bypass",
        description:
          "Weak RBAC configuration allows pod to escalate privileges or access cluster secrets.",
        riskLevel: "High",
        prevention: [
          "Implement restrictive RBAC policies",
          "Regular RBAC audits",
          "Use NetworkPolicies to limit pod communication",
          "Monitor for suspicious API calls",
          "Enable audit logging for API server",
        ],
        cveExample: null,
      },
      {
        id: "serverless-injection",
        title: "Serverless Function Code Injection",
        description:
          "Lambda/Cloud Functions vulnerable to command injection through user input.",
        riskLevel: "High",
        prevention: [
          "Validate and sanitize all inputs",
          "Use least privilege IAM roles",
          "Run functions in restricted environments",
          "Implement WAF for API Gateway",
          "Monitor CloudWatch logs for anomalies",
        ],
        cveExample: null,
      },
      {
        id: "supply-chain-cloud-vendor",
        title: "Supply Chain Attack via Cloud Provider",
        description:
          "Attacker compromises cloud provider or third-party service, affects multiple customers.",
        riskLevel: "Critical",
        prevention: [
          "Vendor security assessment",
          "Redundancy with multiple cloud providers",
          "Zero-trust network architecture",
          "Monitor for unauthorized changes",
          "Business continuity planning",
        ],
        cveExample: null,
      },
      {
        id: "cloud-account-takeover",
        title: "Cloud Account Takeover via Weak Auth",
        description:
          "Attacker gains access to cloud console using weak password or reused credentials.",
        riskLevel: "Critical",
        prevention: [
          "Enforce strong password policies",
          "Require multi-factor authentication",
          "Use single sign-on (SSO) with 2FA",
          "Monitor login anomalies and geo-location changes",
          "Implement device policies and compliance checks",
        ],
        cveExample: null,
      },
    ],
  },

  iotVulnerabilities: {
    title: "IoT & Embedded System Vulnerabilities",
    examples: [
      {
        id: "weak-iot-credentials",
        title: "Weak Default Credentials on IoT Devices",
        description:
          "IoT devices shipped with default username/password (admin/admin), easily compromised.",
        riskLevel: "High",
        prevention: [
          "Change all default credentials immediately",
          "Use strong, unique passwords for each device",
          "Disable unnecessary services/ports",
          "Update firmware to latest version",
        ],
        cveExample: null,
      },
      {
        id: "firmware-backdoor",
        title: "Firmware Backdoor in IoT Device",
        description:
          "Manufacturer intentionally or accidentally includes backdoor in device firmware.",
        riskLevel: "Critical",
        prevention: [
          "Source IoT devices from trusted vendors",
          "Monitor network traffic for anomalies",
          "Segment IoT devices from critical network",
          "Regular firmware analysis and audits",
        ],
        cveExample: null,
      },
      {
        id: "unencrypted-iot-traffic",
        title: "Unencrypted IoT Device Communication",
        description:
          "IoT device transmits data over plain HTTP/unencrypted protocols, easily intercepted.",
        riskLevel: "High",
        prevention: [
          "Enforce HTTPS/TLS for all communications",
          "Use certificate pinning if possible",
          "Monitor network for unencrypted traffic",
          "Update to devices supporting encryption",
        ],
        cveExample: null,
      },
      {
        id: "iot-botnet-recruitment",
        title: "IoT Device Recruitment into Botnet",
        description:
          "Vulnerable IoT device compromised and enrolled in botnet for DDoS campaigns.",
        riskLevel: "High",
        prevention: [
          "Patch firmware vulnerabilities promptly",
          "Monitor for suspicious outbound connections",
          "Implement network segmentation",
          "Use IDS/IPS for anomaly detection",
        ],
        cveExample: null,
      },
      {
        id: "iot-wifi-password-leak",
        title: "IoT Device WiFi Credentials Leak",
        description:
          "WiFi password stored unencrypted in IoT device memory, easily extracted.",
        riskLevel: "High",
        prevention: [
          "Use credentials management vault",
          "Encrypt stored credentials",
          "Isolate IoT on separate WiFi networks",
          "Monitor WiFi traffic for unusual access",
        ],
        cveExample: null,
      },
      {
        id: "smart-lock-bypass",
        title: "Smart Lock Exploitation",
        description:
          "Smart lock lacks physical security or has exploitable wireless protocol, allows bypass.",
        riskLevel: "High",
        prevention: [
          "Choose locks with strong authentication",
          "Use complex auto-unlock codes",
          "Enable audit logging for lock activity",
          "Keep firmware updated",
        ],
        cveExample: null,
      },
      {
        id: "medical-device-wireless-hack",
        title: "Medical Device Wireless Hack",
        description:
          "Pacemaker or insulin pump vulnerable to wireless commands, attacker can alter treatment.",
        riskLevel: "Critical",
        prevention: [
          "Manufacturers implement strong authentication",
          "Security research / responsible disclosure",
          "Monitor for suspicious device behavior",
          "Establish security update process",
        ],
        cveExample: "CVE-2015-4701",
      },
      {
        id: "camera-takeover",
        title: "IP Camera Takeover & Spying",
        description:
          "Webcam/IP camera compromised, attacker gains video feed and potentially moves laterally.",
        riskLevel: "High",
        prevention: [
          "Change default camera credentials",
          "Disable remote access if not needed",
          "Keep camera firmware patched",
          "Isolate cameras on separate VLAN",
        ],
        cveExample: null,
      },
      {
        id: "industrial-sensor-spoofing",
        title: "Industrial Sensor Data Spoofing",
        description:
          "Attacker injects false sensor data, causes manufacturing system to malfunction.",
        riskLevel: "Critical",
        prevention: [
          "Authenticate all sensor data",
          "Use encrypted communication channels",
          "Implement data validation checks",
          "Monitor for anomalies in sensor readings",
        ],
        cveExample: null,
      },
      {
        id: "drone-hijacking",
        title: "Drone Communication Hijacking",
        description:
          "Weak cryptography in drone allows attacker to intercept and takeover drone flight.",
        riskLevel: "High",
        prevention: [
          "Use drones with strong encryption",
          "Maintain physical control signal strength",
          "Monitor for jamming/hijacking attempts",
          "Keep drone firmware and apps updated",
        ],
        cveExample: null,
      },
    ],
  },

  mobileThreats: {
    title: "Mobile App & Device Threats",
    examples: [
      {
        id: "android-malware-banking",
        title: "Android Banking Malware",
        description:
          "Trojan designed for Android phones, overlays fake login screens to steal banking credentials.",
        riskLevel: "High",
        prevention: [
          "Download only from official Google Play Store",
          "Enable Google Play Protect",
          "Use strong lock screen PIN/biometric",
          "Monitor SMS for suspicious 2FA codes",
        ],
        cveExample: null,
      },
      {
        id: "ios-jailbreak-exploitation",
        title: "iOS Jailbreak Exploitation",
        description:
          "Jailbroken iPhone bypasses security sandbox, install malicious packages with full system access.",
        riskLevel: "Critical",
        prevention: [
          "Never jailbreak production devices",
          "Use official Apple app store only",
          "Enable Face ID/Touch ID security",
          "Setup Find My for device tracking",
        ],
        cveExample: null,
      },
      {
        id: "mobile-session-hijacking",
        title: "Mobile App Session Hijacking",
        description:
          "Attacker intercepts authorization tokens from mobile app traffic, impersonates user.",
        riskLevel: "High",
        prevention: [
          "Use HTTPS with certificate pinning",
          "Implement token expiration",
          "Use secure storage for tokens",
          "Monitor for suspicious session activity",
        ],
        cveExample: null,
      },
      {
        id: "app-permission-abuse",
        title: "Mobile App Permission Abuse",
        description:
          "App requests excessive permissions (camera, location, contacts), misuses for tracking/spying.",
        riskLevel: "High",
        prevention: [
          "Review app permissions before installing",
          "Denial permission to non-critical features",
          "Use granular permission settings",
          "Monitor app behavior for anomalies",
        ],
        cveExample: null,
      },
      {
        id: "usb-charging-attack",
        title: "USB Charging Cable Data Siphoning",
        description:
          "Modified USB cable at public charging station transfers data while charging phone.",
        riskLevel: "High",
        prevention: [
          "Use 'charge-only' cable adapters",
          "Avoid public charging stations",
          "Trust only personal/official chargers",
          "Unlock phone only on trusted networks",
        ],
        cveExample: null,
      },
      {
        id: "sim-jacking",
        title: "SIM Jacking/SIM Swap",
        description:
          "Attacker tricks mobile carrier into porting phone number to their SIM card, intercepts SMS 2FA.",
        riskLevel: "Critical",
        prevention: [
          "Add PIN to carrier account",
          "Use authenticator apps instead of SMS",
          "Register security codes with carrier",
          "Use biometric unlock for sensitive accounts",
        ],
        cveExample: null,
      },
      {
        id: "location-tracking-mobile",
        title: "Mobile Device Location Tracking",
        description:
          "Attacker uses malware or app permissions to continuously track device location.",
        riskLevel: "High",
        prevention: [
          "Disable location services for unnecessary apps",
          "Review location permissions regularly",
          "Use location randomization when available",
          "Monitor battery drain (indicator of tracking)",
        ],
        cveExample: null,
      },
      {
        id: "mobile-wifi-interception",
        title: "Public WiFi Man-in-the-Middle on Mobile",
        description:
          "Attacker creates fake WiFi hotspot or intercepts unencrypted traffic on public WiFi.",
        riskLevel: "High",
        prevention: [
          "Use VPN on all public networks",
          "Avoid sensitive transactions on public WiFi",
          "Verify WiFi network name with staff",
          "Disable auto-connect to open networks",
        ],
        cveExample: null,
      },
      {
        id: "app-reverse-engineering",
        title: "Mobile App Reverse Engineering",
        description:
          "Attacker decompiles APK/IPA file, discovers hardcoded credentials or exploitable logic.",
        riskLevel: "High",
        prevention: [
          "Encrypt sensitive strings in code",
          "Implement code obfuscation/minification",
          "Use API key rotation",
          "Monitor for unauthorized app modifications",
        ],
        cveExample: null,
      },
      {
        id: "fake-payment-app",
        title: "Fake Payment App in App Store",
        description:
          "Malicious app mimics legitimate payment app, steals payment information from users.",
        riskLevel: "Critical",
        prevention: [
          "Download only from official stores",
          "Verify app developer identity",
          "Check reviews and ratings carefully",
          "Monitor payment accounts for fraud",
        ],
        cveExample: null,
      },
    ],
  },

  supplyChain: {
    title: "Supply Chain Attacks",
    examples: [
      {
        id: "solarwinds-backdoor",
        title: "SolarWinds Supply Chain Backdoor",
        description:
          "Software vendor compromised, malicious code injected into updates, affects thousands of organizations.",
        riskLevel: "Critical",
        prevention: [
          "Monitor software updates before deploying",
          "Verify software integrity and authenticity",
          "Implement network segmentation",
          "Monitor for C2 communications",
        ],
        cveExample: "CVE-2020-14644",
      },
      {
        id: "npm-package-typosquatting",
        title: "NPM Package Typosquatting",
        description:
          "Attacker publishes malicious npm package with similar name to popular package.",
        riskLevel: "High",
        prevention: [
          "Verify package names spelling carefully",
          "Use exact version pinning",
          "Audit npm dependencies regularly",
          "Use package managers with scanning",
        ],
        cveExample: null,
      },
      {
        id: "compromised-developer-account",
        title: "Compromised Developer Account",
        description:
          "Code repository account hacked, attacker commits malicious code to library.",
        riskLevel: "Critical",
        prevention: [
          "Enforce strong 2FA on all accounts",
          "Use code signing for commits",
          "Require code review before merge",
          "Monitor for unusual commit activity",
        ],
        cveExample: null,
      },
      {
        id: "hardware-supply-chain",
        title: "Hardware Supply Chain Tampering",
        description:
          "Supplier modifies hardware components, adds backdoor or surveillance capabilities.",
        riskLevel: "Critical",
        prevention: [
          "Source from trusted vendors",
          "Implement vendor security assessments",
          "Monitor hardware behavior anomalies",
          "Use air-gapped systems for critical operations",
        ],
        cveExample: null,
      },
      {
        id: "build-pipeline-compromise",
        title: "CI/CD Pipeline Compromise",
        description:
          "Jenkins or GitHub Actions compromised, attacker injects malware into build artifacts.",
        riskLevel: "Critical",
        prevention: [
          "Secure CI/CD infrastructure properly",
          "Implement script approval workflows",
          "Use secrets management (not env vars)",
          "Monitor build logs for anomalies",
        ],
        cveExample: null,
      },
      {
        id: "bom-vulnerability-cascade",
        title: "Bill of Materials (BOM) Vulnerability Cascade",
        description:
          "Vulnerability in dependency of dependency, affects entire supply chain indirectly.",
        riskLevel: "High",
        prevention: [
          "Use SBOM (Software Bill of Materials) tools",
          "Scan transitive dependencies",
          "Monitor CVE databases proactively",
          "Upgrade dependencies regularly",
        ],
        cveExample: null,
      },
      {
        id: "open-source-abandonment",
        title: "Abandoned Open Source Package Maintenance",
        description:
          "Unmaintained library has critical vulnerability, no one to issue patches.",
        riskLevel: "High",
        prevention: [
          "Periodically audit open source dependencies",
          "Fork critical unmaintained projects",
          "Plan for dependency replacement",
          "Use dependency management tools",
        ],
        cveExample: null,
      },
      {
        id: "firmware-update-backdoor",
        title: "Firmware Update Supply Chain Attack",
        description:
          "Manufacturer's firmware update server compromised, distributes infected updates.",
        riskLevel: "Critical",
        prevention: [
          "Verify firmware signatures before applying",
          "Test updates in isolated environment first",
          "Monitor for unauthorized firmware versions",
          "Keep audit logs of firmware changes",
        ],
        cveExample: null,
      },
      {
        id: "third-party-vulnerability",
        title: "Third-Party Vendor Vulnerability",
        description:
          "Vendor used for analytics, logging, or monitoring is compromised, exposes customer data.",
        riskLevel: "Critical",
        prevention: [
          "Vendor security due diligence",
          "Data protection agreements",
          "Monitor vendor access and activity",
          "Have vendor replacement plan",
        ],
        cveExample: null,
      },
      {
        id: "counterfeit-components",
        title: "Counterfeit Hardware Components",
        description:
          "Fake processor/memory sold as genuine, lacks quality/security standards.",
        riskLevel: "High",
        prevention: [
          "Source from authorized distributors",
          "Implement component verification",
          "Physical security audits",
          "Monitor for performance anomalies",
        ],
        cveExample: null,
      },
    ],
  },
};

/**
 * Get random threat from a category
 * @param {string} category - Category name
 * @returns {Object|null} Random threat or null if category not found
 */
function getRandomThreatFromCategory(category) {
  if (!threatCategories[category] || threatCategories[category].examples.length === 0) {
    return null;
  }

  const examples = threatCategories[category].examples;
  const randomExample = examples[Math.floor(Math.random() * examples.length)];

  return {
    ...randomExample,
    category,
    categoryTitle: threatCategories[category].title,
    source: "local",
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Get all category titles
 * @returns {Array<{id: string, title: string}>} List of categories
 */
function getAllCategories() {
  return Object.entries(threatCategories).map(([id, data]) => ({
    id,
    title: data.title,
    exampleCount: data.examples.length,
  }));
}

/**
 * Get random threat from any category
 * @returns {Object} Random threat from random category
 */
function getRandomThreat() {
  const categories = Object.keys(threatCategories);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  return getRandomThreatFromCategory(randomCategory);
}

module.exports = {
  threatCategories,
  getRandomThreatFromCategory,
  getAllCategories,
  getRandomThreat,
};
