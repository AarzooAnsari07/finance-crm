import { useState } from 'react';
import { CustomerProfile, EligibilityResult } from './types';
import { banks } from './data/banks';
import { getAllEligibilityResults } from './utils/eligibility';
import { TopNavigation } from './components/TopNavigation';
import { LeadSummaryPanel } from './components/LeadSummaryPanel';
import { ActivityTimelineCenter } from './components/ActivityTimelineCenter';
import { InsightsPanel } from './components/InsightsPanel';
import { EligibilityCheckerPage } from './components/EligibilityCheckerPage';
import { CompanyCheckerPage } from './components/CompanyCheckerPage';
import { PinCodeCheckerPage } from './components/PinCodeCheckerPage';
import { LeadsPage } from './components/LeadsPage';
import { DashboardPage } from './components/DashboardPage';
import { ReportsPage } from './components/ReportsPage';
import { SettingsPage } from './components/SettingsPage';
import { MyProfilePage } from './components/MyProfilePage';
import { AccountSettingsPage } from './components/AccountSettingsPage';
import { ChangePasswordPage } from './components/ChangePasswordPage';
import { UserManagementPage } from './components/UserManagementPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [customerProfile, setCustomerProfile] = useState<CustomerProfile | null>(null);
  const [results, setResults] = useState<EligibilityResult[]>([]);

  const handleFormSubmit = (profile: CustomerProfile) => {
    setCustomerProfile(profile);
    const eligibilityResults = getAllEligibilityResults(profile, banks);
    setResults(eligibilityResults);
    setCurrentPage('lead-detail');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation currentPage={currentPage} onNavigate={setCurrentPage} />

      {currentPage === 'dashboard' && <DashboardPage />}

      {currentPage === 'leads' && <LeadsPage />}

      {currentPage === 'eligibility' && <EligibilityCheckerPage onComplete={handleFormSubmit} />}

      {currentPage === 'company' && <CompanyCheckerPage />}

      {currentPage === 'pincode' && <PinCodeCheckerPage />}

      {currentPage === 'reports' && <ReportsPage />}

      {currentPage === 'settings' && <SettingsPage onNavigate={setCurrentPage} />}

      {currentPage === 'my-profile' && <MyProfilePage />}

      {currentPage === 'account-settings' && <AccountSettingsPage />}

      {currentPage === 'change-password' && <ChangePasswordPage />}

      {currentPage === 'user-management' && <UserManagementPage />}

      {currentPage === 'lead-detail' && customerProfile && results.length > 0 && (
        <div className="flex">
          <LeadSummaryPanel
            customer={customerProfile}
            eligibleCount={results.filter((r) => r.isEligible).length}
            totalBanks={results.length}
          />
          <ActivityTimelineCenter customer={customerProfile} results={results} />
          <InsightsPanel results={results} />
        </div>
      )}
    </div>
  );
}