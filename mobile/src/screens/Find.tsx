import { Heading, useNativeBase, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { err } from "react-native-svg/lib/typescript/xml";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";

export function Find() {

    const [isLoading, setIsloading] = useState(false);
    const [code, setCode] = useState('');

    const toast = useToast();
    const {navigate} = useNavigation();

    async function handleJoinPool() {
        try {
            setIsloading(true);

            if (!code.trim()){
                return toast.show({
                    title: 'Informe o código.',
                    placement: 'top',
                    bgColor: 'red.500'
                });
            }

            await api.post('/pools/join', {code});

            toast.show({
                title: 'Você entrou no bolão com sucesso.',
                placement: 'top',
                bgColor: 'green.500'
            });
            navigate('pools');

        } catch (error) {
            console.log(error);
            if (error.response?.data?.message === 'Pool not found.') {

                return toast.show({
                    title: 'Bolão não encontrado.',
                    placement: 'top',
                    bgColor: 'red.500'
                });
            }

            if (error.response?.data?.message === 'You already joined this pool.') {

                return toast.show({
                    title: 'Você já está nesse bolão!.',
                    placement: 'top',
                    bgColor: 'red.500'
                });
            }

            toast.show({
                title: 'Não foi possivel encontrar o bolão.',
                placement: 'top',
                bgColor: 'red.500'
            });
        } 
    }
    return (
        <VStack flex={1} bgColor='gray.900'>
            <Header title="Buscar por codigo" showBackButton />

            <VStack mt={8} mx={5} alignItems="center">

                <Heading fontFamily="heading" color='white' fontSize='xl' mb={8} textAlign='center'>
                    Crie seu proprio bolao da copa {'\n'} e compartilhe entre amigos!
                </Heading>
                <Input mb={2} placeholder='Qual nome do seu bolao' autoCapitalize="characters" onChangeText={setCode} />
                <Button title="BUSCAR SEU BOLÃO" isLoading={isLoading} onPress={handleJoinPool} />


            </VStack>

        </VStack>
    );
}
