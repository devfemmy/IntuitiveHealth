import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import {Platform} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileButton = props => {
    return <HeaderButton {...props} IconComponent= {Icon} iconSize= {23}
    color= {'white'}
    />
};

export default ProfileButton;