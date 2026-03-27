import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import Header from "../components/Header";
import ProfileDetailsPane from "../components/ProfileDetailsPane";
import { useAuth } from "../context/AuthContext";
import { upsertUserProfile } from "../lib/firestoreService";

const PageContainer = styled.div`
  min-height: 100vh;
  background: transparent;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PageTitle = styled.h1`
  font-size: clamp(1.9rem, 2.4vw, 2.4rem);
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.03em;
`;

const PageSubtitle = styled.p`
  color: var(--text-secondary);
  margin: 0.35rem 0 0;
`;

const Profile = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const handleProfileSave = async (profileData) => {
    if (!user?.uid) {
      throw new Error("No authenticated user found.");
    }

    setIsSavingProfile(true);
    try {
      await upsertUserProfile(user.uid, profileData, user);
      await refreshUserProfile();
    } finally {
      setIsSavingProfile(false);
    }
  };

  return (
    <PageContainer>
      <Header />

      <MainContent
        as={motion.div}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div>
          <PageTitle>Profile Settings</PageTitle>
          <PageSubtitle>
            Update your details to make simulations more realistic and role-specific.
          </PageSubtitle>
        </div>

        <ProfileDetailsPane
          user={user}
          profile={userProfile}
          onSave={handleProfileSave}
          isSaving={isSavingProfile}
        />
      </MainContent>
    </PageContainer>
  );
};

export default Profile;
