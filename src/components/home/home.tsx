import React, { useState, useEffect } from "react";
import { Profile } from "../../models/profile";
import { UserProfile } from "../user-profile/user-profile";
import { fetchData } from "../../data-source/fetch-data";
import { useHistory } from "react-router-dom";
import { Button } from "antd";
import { TransactionData } from "../transaction/transaction";
import { AnalysisData } from "../analysis/analysis";

export function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);

  const history = useHistory();

  function createTransaction() {
    history.push('/create-transaction');
  }

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchData('http://localhost:3000/profiles');
        setProfile(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <div className="content">
      <div className="left-container">
        <div className='top box-container'>
          <AnalysisData />
        </div>
        <div>
          <Button type='primary' onClick={createTransaction}>
            Create new transaction
            </Button>
        </div>
        <div className='datatable'>
          <TransactionData />
        </div>
      </div>

      <div className='profile'>
        <h3>Profile</h3>
        {profile ? <UserProfile profile={profile} /> : null}
      </div>
    </div>
  );
}