import React from 'react';
import { Profile } from '../../models/profile';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

const defaultAvatar = 'https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png';

interface Props {
    profile: Profile;
}

export function UserProfile(props: Props) {
    const { profile } = props;
    const history = useHistory();

    function editProfile() {
        history.push('/edit-profile');
    }
    return (<div>
        <div className="user-avatar">
            <img src={profile.avartar ? profile.avartar : defaultAvatar} alt=''></img>
        </div>
        <div>
            <h3>{profile.name}</h3>
            <h3>{profile.title}</h3>
        </div>
        <div>
            <Button type='primary' onClick={editProfile}>Edit Profile</Button>
        </div>
        <div>
            <div className='roles'>
                <h4>Role</h4>
                <p>{profile.roles.join()}</p>
            </div>
            <div className='email'>
                <h4>Email</h4>
                <p>{profile.email}</p>
            </div>
            <div className='phone'>
                <h4>Phone</h4>
                <p>{profile.phone}</p>
            </div>
            <div className='bio'>
                <h4>Bio</h4>
                <p>{profile.bio}</p>
            </div>
        </div>
    </div>);
}
