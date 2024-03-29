import { NavigationContainer } from '@react-navigation/native';
import { Box } from 'native-base';
import App from '../../App';
import { useAuth } from '../hooks/useAuth';
import { SignIn } from '../screens/Signin';

import { AppRoutes } from './app.routes';


export function Routes() {

    const { user } = useAuth();

    return (
        <Box flex={1} bg="gray.900">
        <NavigationContainer>
            {user.name ? <AppRoutes /> : <SignIn />}


        </NavigationContainer>
        </Box>
    )
}