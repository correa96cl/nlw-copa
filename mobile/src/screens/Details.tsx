import { useRoute } from "@react-navigation/native";
import { HStack, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Share } from "react-native";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Guesses } from "../components/Guesses";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";
import { PoolCardPros } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { api } from "../services/api";

interface RouteParams {
    id: string;
}

export function Details() {

    const [isLoading, setIsLoading] = useState(true);
    const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses');
    const [poolDetails, setPoolsDetails] = useState<PoolCardPros>({} as PoolCardPros);
    const route = useRoute();
    const toast = useToast();
    const { id } = route.params as RouteParams;

    async function fetchPoolDetails() {
        try {
            setIsLoading(true);

            const response = await api.get(`/pools/${id}`);
            setPoolsDetails(response.data.pool);

        } catch (error) {
            console.log(error);
            toast.show({
                title: 'Não foi possivel carregar os detalhes do bolao.',
                placement: 'top',
                bgColor: 'red.500'
            });

        } finally {
            setIsLoading(false);
        }

        useEffect(() => {
            fetchPoolDetails();
        }, [id]);

        if (isLoading) {
            return (
                <Loading />
            )

        }
    }


    async function handleCodeShare(){
       await Share.share({
            message: poolDetails.code
        });
    }
    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title={poolDetails.title} showBackButton showShareButton onShare={handleCodeShare} />

            {
                poolDetails._count?.participants > 0 ?
                    <VStack px={5} flex={1}>
                        <PoolHeader data={poolDetails} />
                        <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                            <Option title="Seus palpites" isSelected={optionSelected === 'guesses'} onPress={() => setOptionSelected('guesses')} />
                            <Option title="Ranking do grupo" isSelected={optionSelected === 'ranking'} onPress={() => setOptionSelected('ranking')} />
                        </HStack>
                        <Guesses poolId={poolDetails.id} code={poolDetails.code}/>
                    </VStack>
                    : <EmptyMyPoolList code={poolDetails.code} />
            }
        </VStack>

    );
}