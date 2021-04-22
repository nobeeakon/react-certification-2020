import React from 'react';

import { useGlobalContext } from '../../providers/Global/Global.provider';

import Avatar from './SingInAndAvatar/Avatar.component';
import SignIn from './SingInAndAvatar/SignIn.component';

const SignInOrAvatar = () => {
  const { globalState } = useGlobalContext();

  const { isAuthenticated } = globalState;

  return <>{isAuthenticated ? <Avatar /> : <SignIn />}</>;
};

export default SignInOrAvatar;
