import React, { useEffect, useState } from 'react';
import {useForm, Controller} from 'react-hook-form'
import { ActivityIndicator, FlatList, Text, View, StyleSheet, TouchableOpacity, TextInput, Picker } from 'react-native';
//import styles from '../assets/styles';
import axios from 'axios'; // consumidor de api's

export default function VentaScreen() {

  const {control, handleSubmit, getValues, setValue, formState:{errors}}=useForm({
    defaultValues:{
      idVendedor:'',
      fecha:'',
      zona: 'Norte',
      valorVenta:''
    },
    mode:'onChange'
  })

  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const onSubmitSave = datos =>{
    console.log(datos)
    saveVenta()    
  }
  
  const onSubmitUpdate = datos =>{
    console.log(datos)
    updateVenta(getValues("idVendedor"))
  }

  const url="http://192.168.1.2:3000"


 

  const saveVenta = async () => {
    if (!getValues('idVendedor').trim() || !getValues('zona').trim() || !getValues('fecha').trim() || !getValues('valorVenta').trim()) {
      alert("Todos los datos son obligatorios");
      return;
    }
    setLoading(true);
    const idVendedor=getValues('idVendedor');
    const fecha = getValues('fecha');
    const valorVenta = getValues('valorVenta');
    const zona = getValues('zona');
    
    try {
      const response = await axios.get(`${url}/api/vendedores/${idVendedor}`);
      setData(response.data);
      setValue('idVendedor', response.data.idVendedor)
        try {
          const response = await axios.post(`${url}/api/ventas`, {
            idVendedor,
            zona,
            fecha,
            valorVenta
          });
          updateComision(getValues("idVendedor"))
          alert("Venta agregada correctamente ...")
        } catch (error) {
          console.log(error);
          alert("Error al agregar venta ...")
        }
        finally {
          setLoading(false);
        }

    }catch (error) {
      alert("El vendedor con ese id no está en la base de datos. Intente con otro id.")
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


  
  const calcularComision = () =>{
    let comision=0;
    if (getValues('zona') == "Norte"){
      comision=(getValues('valorVenta')*2)/100
    }
    if (getValues('zona') == "Sur"){
      comision=(getValues('valorVenta')*3)/100
    }
    return comision;
  }


  const updateComision = async (id) => {
    setLoading(true);
    try {
        const idVendedor = getValues('idVendedor');
        const responseVendedor = await axios.get(`${url}/api/vendedores/${id}`);
        setData(responseVendedor.data);
        const nombre = responseVendedor.data.nombre;
        const correo = responseVendedor.data.correo;        
        const totalComision = responseVendedor.data.totalComision + calcularComision();
        const response = await axios.put(`${url}/api/vendedores/${id}`, {
          idVendedor,
          nombre,
          correo,
          totalComision
        });

    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  };




  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TouchableOpacity
        style={[styles.touchables, { backgroundColor: '#c71852' }]}
        onPress={() => getVentas()}
      >
        <Text style={{ color: 'yellow'}}>Listar Ventas </Text>
      </TouchableOpacity>

      <Controller
        control={control}
        rules={{
          required:true, 
          pattern: /(^\d{1,10}$)/g
        }}
        render={({field:{onChange, onBlur, value}})=>(
          <TextInput
            style={[styles.inputs, {borderColor: errors.idVendedor?.type=='required' || errors.idVendedor?.type=='pattern' ? 'red' : 'green'}]}
            placeholder="Ingrese el id del Vendedor"
            onChange={onChange}
            value={value}
            onBlur={onBlur}
          />
        )}
        name='idVendedor'
      />
      {errors.idVendedor?.type=='required' && <Text style={{color:'red'}}>El id del vendedor es obligatorio.</Text>}
      {errors.idVendedor?.type=='pattern' && <Text style={{color:'red'}}>Solo se permiten números</Text>}
        <Text>Zona: </Text>

        <Controller
        control={control}
        render={({field:{onChange, onBlur, value}})=>(  
        <Picker
                selectedValue={value}
                style={styles.inputs}
                onChange={onChange}
                onBlur={onBlur}
            >
                <Picker.Item label="Norte" value="Norte" />
                <Picker.Item label="Sur" value="Sur" />
        </Picker>
        )}
        name='zona'
        />
      <Controller
                control={control}                                
                rules={{
                    required:true, 
                    pattern: /^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/,
                }}
                render={({field:{onChange, onBlur, value}})=>(
                    <TextInput
                        style={[styles.inputs, {borderColor: errors.identificacion?.type=='required' || errors.identificacion?.type=='pattern' ? 'red' : 'green'}]}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder='Fecha'
                    />
                )}
                name='fecha'
            />
            {errors.fecha?.type=='required' && <Text style={{color:'red'}}>La fecha es obligatoria</Text>}
            {errors.fecha?.type=='pattern' && <Text style={{color:'red'}}>Solo formato fecha DD/MM/AAAA</Text>}
      
      <Controller
                control={control}                                
                rules={{
                    required:true, 
                    pattern: /[^a-z ]\ *([.0-9])*\d/g,
                    min: 2000000
                }}
                render={({field:{onChange, onBlur, value}})=>(
                    <TextInput
                        style={[styles.inputs, {borderColor: errors.valorVenta?.type=='required' || errors.valorVenta?.type=='pattern' || errors.valorVenta?.type=='min' ? 'red' : 'green'}]}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder='Valor venta'
                    />
                )}
                name='valorVenta'
            />
            {errors.valorVenta?.type=='required' && <Text style={{color:'red'}}>El valor de la venta es obligatorio</Text>}
            {errors.valorVenta?.type=='pattern' && <Text style={{color:'red'}}>Solo se permiten números</Text>}
            {errors.valorVenta?.type=='min' && <Text style={{color:'red'}}>El valor de la venta debe ser mínimo de 2000000 (dos millones)</Text>}

      <TouchableOpacity
        style={[styles.touchables, { backgroundColor: '#18c733', marginTop:10 }]}
        onPress={handleSubmit(onSubmitSave)}
      >
        <Text style={{ color: 'yellow' }}>Guardar</Text>
      </TouchableOpacity>


      <Text>Listado de Ventas</Text>
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