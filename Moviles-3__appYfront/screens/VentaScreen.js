import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, TouchableOpacity, TextInput, Picker } from 'react-native';
//import styles from '../assets/styles';
import axios from 'axios'; // consumidor de api's

export default function VentaScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [idVendedor, setIdVendedor] = useState('');
  const [zona, setZona] = useState('');
  const [fecha, setFecha] = useState('');
  const [valorVenta, setValorventa] = useState('');

  const url="http://192.168.1.2:3000"

  const saveVenta = async () => {
    if (!idVendedor.trim() || !zona.trim() || !fecha.trim() || !valorVenta.trim()) {
      alert("Todos los datos son obligatorios");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${url}/api/ventas`, {
        idVendedor,
        zona,
        fecha,
        valorVenta
      });
      alert("Venta agregada correctamente ...")
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  };

  const updateVenta = async (id) => {
    if (!idVendedor.trim() || !zona.trim() || !fecha.trim() || !valorVenta.trim()) {
      alert("Todos los datos son obligatorios");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.put(`${url}/api/ventas/${id}`, {
        idVendedor,
        zona,
        fecha,
        valorVenta
      });
      alert("Venta actualizada correctamente ...")
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  };

  const getVentas = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/ventas`);
      setData(response.data);
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    //getVentas(); // Se ejecutará este método al iniciar, por primera vez, el componente
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TouchableOpacity
        style={[styles.touchables, { backgroundColor: '#c71852' }]}
        onPress={() => getVentas()}
      >
        <Text style={{ color: 'yellow'}}>Listar Ventas </Text>
      </TouchableOpacity>

      <TextInput
        style={styles.inputs}
        placeholder="Id del vendedor"
        onChangeText={idVendedor => setIdVendedor(idVendedor)}
        value={idVendedor}
      />
        <Text>Zona: </Text>
        <Picker
                selectedValue={zona}
                style={styles.inputs}
                onValueChange={(itemValue, itemIndex) => setZona(itemValue)}
            >
                <Picker.Item label="Norte" value="Norte" />
                <Picker.Item label="Sur" value="Sur" />
        </Picker>
      <TextInput
        style={styles.inputs}
        placeholder="Fecha"
        onChangeText={fecha => setFecha(fecha)}
        value={fecha}
      />
      
      <TextInput
        style={[styles.inputs, { marginBottom:'30px'}]}
        placeholder="Valor Venta"
        onChangeText={valorVenta => setValorventa(valorVenta)}
        value={valorVenta}
      />

      <TouchableOpacity
        style={[styles.touchables, { backgroundColor: '#18c733' }]}
        onPress={() => saveVenta()}
      >
        <Text style={{ color: 'yellow' }}>Guardar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.touchables, { backgroundColor: '#0cc6ec' }]}
        onPress={() => updateCliente(idsearch)}
      >
        <Text style={{ color: 'yellow' }}>Actualizar</Text>
      </TouchableOpacity>

      {isLoading ? <ActivityIndicator size="large" color="red" /> : (
        <FlatList
          data={data}
          //keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.touchables, { backgroundColor: 'orange' }]}
              >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.idVendedor} {item.zona} {item.fecha} {item.valorVenta}</Text>
            </TouchableOpacity>

          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchables: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginBottom: 10
  },
  inputs: {
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    textAlign: 'center',
    padding: 5
  }
});