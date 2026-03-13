import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Building2, BriefcaseBusiness, GraduationCap, Sparkles } from "lucide-react";

import Button from "./Button";
import Input from "./Input";
import Label from "./Label";
import Progress from "./Progress";
import Badge from "./Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./Card";

const PaneGrid = styled.div`
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const LeftAlignedCard = styled(Card)`
  text-align: left;
  align-items: stretch;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;

const Select = styled.select`
  display: flex;
  height: 2.5rem;
  width: 100%;
  border-radius: var(--radius);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--background));
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: hsl(var(--foreground));

  &:focus-visible {
    outline: 2px solid hsl(var(--ring));
    outline-offset: 2px;
    border-color: transparent;
  }
`;

const Textarea = styled.textarea`
  min-height: 6.75rem;
  width: 100%;
  border-radius: var(--radius);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--background));
  padding: 0.75rem;
  font-size: 0.875rem;
  color: hsl(var(--foreground));
  resize: vertical;

  &:focus-visible {
    outline: 2px solid hsl(var(--ring));
    outline-offset: 2px;
    border-color: transparent;
  }
`;

const HelperText = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: hsl(var(--muted-foreground));
  line-height: 1.5;
`;

const SummaryBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HighlightRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  border-radius: var(--radius);
  border: 1px solid hsl(var(--border));
  background: hsl(var(--muted) / 0.3);

  svg {
    color: hsl(var(--primary));
  }
`;

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const personaOptions = [
  "Student",
  "Employed Professional",
  "Business Owner",
  "Freelancer",
  "Job Seeker",
  "General User",
];

const workEnvironmentOptions = [
  "On-site",
  "Remote",
  "Hybrid",
  "Campus",
  "Personal / Home",
];

const experienceOptions = [
  "Beginner",
  "Entry-level",
  "Mid-level",
  "Senior",
  "Leadership",
];

const focusOptions = [
  "General phishing awareness",
  "Business email compromise",
  "Credential theft",
  "Finance and invoice fraud",
  "Student portal scams",
  "Consumer account safety",
];

const buildFormState = (profile = {}, user = null) => {
  const safeProfile = profile || {};

  return {
    organizationName: safeProfile.organizationName || "",
    industry: safeProfile.industry || "",
    department: safeProfile.department || "",
    roleTitle: safeProfile.roleTitle || "",
    personaType: safeProfile.personaType || "",
    workEnvironment: safeProfile.workEnvironment || "",
    experienceLevel: safeProfile.experienceLevel || "",
    emailDomain: safeProfile.emailDomain || (user?.email?.includes("@") ? user.email.split("@")[1].toLowerCase() : ""),
    commonTools: safeProfile.commonTools || "",
    simulationFocus: safeProfile.simulationFocus || "",
    notes: safeProfile.notes || "",
  };
};

const completionFields = [
  "organizationName",
  "industry",
  "roleTitle",
  "personaType",
  "workEnvironment",
  "emailDomain",
  "simulationFocus",
];

const formatUpdatedAt = (updatedAt) => {
  if (!updatedAt) return "Not saved yet";

  let dateValue = null;
  if (typeof updatedAt?.toDate === "function") {
    dateValue = updatedAt.toDate();
  } else if (updatedAt instanceof Date) {
    dateValue = updatedAt;
  } else if (typeof updatedAt === "string" || typeof updatedAt === "number") {
    const parsed = new Date(updatedAt);
    if (!Number.isNaN(parsed.getTime())) {
      dateValue = parsed;
    }
  }

  if (!dateValue) return "Not saved yet";

  return dateValue.toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ProfileDetailsPane = ({ user, profile, onSave, isSaving }) => {
  const [formState, setFormState] = useState(() => buildFormState(profile, user));
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormState(buildFormState(profile, user));
    const hasProfileData = Object.values(buildFormState(profile, user)).some((value) => String(value || "").trim());
    setIsEditing(!hasProfileData);
  }, [profile, user]);

  const completion = useMemo(() => {
    const filled = completionFields.filter((field) => String(formState[field] || "").trim()).length;
    return Math.round((filled / completionFields.length) * 100);
  }, [formState]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
    if (status.type !== "idle") {
      setStatus({ type: "idle", message: "" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isEditing) return;
    setStatus({ type: "idle", message: "" });

    try {
      await onSave(formState);
      setStatus({ type: "success", message: "Profile saved. Upcoming simulations will use this context." });
      setIsEditing(false);
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Failed to save profile details." });
    }
  };

  const handleEdit = () => {
    setStatus({ type: "idle", message: "" });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormState(buildFormState(profile, user));
    setStatus({ type: "idle", message: "" });
    setIsEditing(false);
  };

  const displayChips = [formState.personaType, formState.roleTitle, formState.workEnvironment, formState.simulationFocus]
    .filter(Boolean)
    .slice(0, 4);

  return (
    <PaneGrid>
      <LeftAlignedCard>
        <CardHeader style={{ alignItems: "flex-start", textAlign: "left" }}>
          <CardTitle style={{ fontSize: "1.25rem" }}>Profile Details</CardTitle>
          <CardDescription style={{ textAlign: "left" }}>
            Add workplace, education, or personal context so each simulation matches the user more closely.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit}>
            <FieldGrid>
              <FieldGroup>
                <Label htmlFor="organizationName">Company / Institution</Label>
                <Input id="organizationName" name="organizationName" value={formState.organizationName} onChange={handleChange} placeholder="Acme Corp or State University" disabled={!isEditing} />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="industry">Industry / Domain</Label>
                <Input id="industry" name="industry" value={formState.industry} onChange={handleChange} placeholder="Healthcare, fintech, education" disabled={!isEditing} />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="roleTitle">Role / Title</Label>
                <Input id="roleTitle" name="roleTitle" value={formState.roleTitle} onChange={handleChange} placeholder="Operations analyst, student, homemaker" disabled={!isEditing} />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="department">Department / Field</Label>
                <Input id="department" name="department" value={formState.department} onChange={handleChange} placeholder="Finance, admissions, sales" disabled={!isEditing} />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="personaType">User Type</Label>
                <Select id="personaType" name="personaType" value={formState.personaType} onChange={handleChange} disabled={!isEditing}>
                  <option value="">Select one</option>
                  {personaOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Select>
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="workEnvironment">Work Setting</Label>
                <Select id="workEnvironment" name="workEnvironment" value={formState.workEnvironment} onChange={handleChange} disabled={!isEditing}>
                  <option value="">Select one</option>
                  {workEnvironmentOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Select>
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="experienceLevel">Experience Level</Label>
                <Select id="experienceLevel" name="experienceLevel" value={formState.experienceLevel} onChange={handleChange} disabled={!isEditing}>
                  <option value="">Select one</option>
                  {experienceOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Select>
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="emailDomain">Primary Email Domain</Label>
                <Input id="emailDomain" name="emailDomain" value={formState.emailDomain} onChange={handleChange} placeholder="company.com or university.edu" disabled={!isEditing} />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="commonTools">Common Tools / Platforms</Label>
                <Input id="commonTools" name="commonTools" value={formState.commonTools} onChange={handleChange} placeholder="Slack, SAP, Teams, LMS" disabled={!isEditing} />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="simulationFocus">Simulation Focus</Label>
                <Select id="simulationFocus" name="simulationFocus" value={formState.simulationFocus} onChange={handleChange} disabled={!isEditing}>
                  <option value="">Select one</option>
                  {focusOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Select>
              </FieldGroup>
            </FieldGrid>

            <FieldGroup>
              <Label htmlFor="notes">Additional Context</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formState.notes}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Mention vendors, seasonal workflows, current projects, or anything else that should influence the simulation tone."
              />
              <HelperText>
                Examples: payroll deadlines, student loan reminders, procurement approvals, delivery notifications, or tools your users see every day.
              </HelperText>
            </FieldGroup>

            <FooterRow>
              <div>
                {status.message ? (
                  <HelperText style={{ color: status.type === "error" ? "hsl(var(--destructive))" : "hsl(var(--success))" }}>
                    {status.message}
                  </HelperText>
                ) : (
                  <HelperText>
                    Signed in as {profile?.displayName || user?.displayName || user?.email || "current user"}. Last updated: {formatUpdatedAt(profile?.updatedAt)}.
                  </HelperText>
                )}
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {isEditing ? (
                  <>
                    <Button type="button" variant="ghost" onClick={handleCancel} disabled={isSaving}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Profile"}
                    </Button>
                  </>
                ) : (
                  <Button type="button" onClick={handleEdit}>
                    Edit Profile
                  </Button>
                )}
              </div>
            </FooterRow>
          </Form>
        </CardContent>
      </LeftAlignedCard>

      <LeftAlignedCard style={{ background: "linear-gradient(180deg, hsl(var(--secondary) / 0.5), hsl(var(--background)))" }}>
        <CardHeader style={{ alignItems: "flex-start", textAlign: "left" }}>
          <CardTitle style={{ fontSize: "1.1rem" }}>Simulation Tailoring</CardTitle>
          <CardDescription style={{ textAlign: "left" }}>
            The more complete this profile is, the more believable and role-specific the phishing scenarios become.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SummaryBlock>
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.65rem" }}>
                <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>Profile completeness</span>
                <Badge variant={completion >= 70 ? "success" : completion >= 40 ? "warning" : "outline"}>{completion}%</Badge>
              </div>
              <Progress value={completion} />
            </div>

            <HighlightRow>
              <Building2 size={18} />
              <div>
                <div style={{ fontWeight: 600 }}>Organization-aware content</div>
                <HelperText>Company names, departments, and email domains shape sender identities and lures.</HelperText>
              </div>
            </HighlightRow>

            <HighlightRow>
              <BriefcaseBusiness size={18} />
              <div>
                <div style={{ fontWeight: 600 }}>Role-specific pressure tactics</div>
                <HelperText>Finance, HR, students, and general users all get different phishing themes and urgency patterns.</HelperText>
              </div>
            </HighlightRow>

            <HighlightRow>
              <GraduationCap size={18} />
              <div>
                <div style={{ fontWeight: 600 }}>Better training fit</div>
                <HelperText>Saved context is reused for future simulations and the AI analysis shown after each run.</HelperText>
              </div>
            </HighlightRow>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", fontWeight: 600 }}>
                <Sparkles size={16} />
                Current targeting snapshot
              </div>
              {displayChips.length > 0 ? (
                <ChipRow>
                  {displayChips.map((chip) => (
                    <Badge key={chip} variant="outline">{chip}</Badge>
                  ))}
                </ChipRow>
              ) : (
                <HelperText>Fill in user type, role, and focus to generate sharper scenarios.</HelperText>
              )}
            </div>
          </SummaryBlock>
        </CardContent>
      </LeftAlignedCard>
    </PaneGrid>
  );
};

export default ProfileDetailsPane;