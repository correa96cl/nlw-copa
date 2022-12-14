import { Heading, VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function Find(){
    return (
        <VStack flex={1} bgColor='gray.900'>
            <Header title="Buscar por codigo"  showBackButton/>

            <VStack mt={8} mx={5} alignItems="center">
               
                <Heading fontFamily="heading" color='white' fontSize='xl' mb={8} textAlign='center'>
                    Crie seu proprio bolao da copa {'\n'} e compartilhe entre amigos!
                </Heading>
                <Input mb={2} placeholder='Qual nome do seu bolao'/>
                <Button title="BUSCAR SEU BOLÃO"/>

                
            </VStack>

        </VStack>
    );
}
