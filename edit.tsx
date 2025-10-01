//import para capturar o estado do componente
import { useState } from 'react'; 
//import para utilizar os componentes
import { SafeAreaView, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

Para os dois abaixo precisaremos instalar algumas bibliotecas/dependencias
import Toast from 'react-native-toast-message';

import { supabase } from '../../src/supabaseClient';

4ª parte: Mecanismo que ira fazer todo o processo de validação e inserção dos dados:
const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  const enviarDados = async () => {
    // Validação
    if (!nome.trim() || !telefone.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Por favor, preencha todos os campos',
      });
      return;
    }

    const { data, error } = await supabase
      .from('pessoas')
      .insert([{ nome: nome.trim(), telefone: telefone.trim() }]);

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao enviar dados',
        text2: error.message,
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Dados enviados com sucesso!',
      });
      setNome('');
      setTelefone('');
    }
  };
