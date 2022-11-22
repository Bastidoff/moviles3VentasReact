import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
//import styles from '../assets/styles';
import axios from 'axios'; // consumidor de api's

export default function VendedorScreen() {

  const {control, handleSubmit, getValues, setValue, formState:{errors}}=useForm({
    defaultValues:{
      idVendedor:'',
      nombre:'',
      correo:'',
      totalComision:''
    },
    mode:'onChange'
  })

  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const url="http://192.168.1.2:3000";

  


  const saveVendedor = async () => {
    if (!getValues("idVendedor").trim() || !getValues("nombre").trim() || !getValues("correo").trim() || !getValues("totalComision").trim()) {
      alert("Todos los datos son obligatorios");
      return;
    }
    setLoading(true);
    const idVendedor = getValues("idVendedor");
    const nombre = getValues("nombre");
    const correo = getValues("correo");
    const totalComision = getValues("totalComision");
    try {
      const response = await axios.post(`${url}/api/vendedores`, {
        idVendedor,
        nombre,
        correo,
        totalComision
      });
      alert("Vendedor agregado correctamente ...")
    } catch (error) {
      console.log(error)
      alert(`Error al agregar vendedor... ${error}`)
    }
    finally {
      setLoading(false);
    }
  };

  const updateVendedor = async (id) => {
    if (!getValues("idVendedor").trim() || !getValues("nombre").trim() || !getValues("correo").trim() || !getValues("totalComision").trim()) {
      alert("Todos los datos son obligatorios");
      return;
    }
    setLoading(true);
    const idVendedor = getValues("idVendedor");
    const nombre = getValues("nombre");
    const correo = getValues("correo");
    const totalComision = getValues("totalComision");
    try {
      const response = await axios.put(`${url}/api/vendedores/${id}`, {
        idVendedor,
        nombre,
        correo,
        totalComision
      });
      alert("Vendedor actualizado correctamente ...")
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  };


  const getVendedores = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/vendedores`);
      setData(response.data);
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  };

  const getVendedorPorId = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/vendedores/${id}`);
      setData(response.data);
      if (response.data.idVendedor != null) {
        setValue('nombre', response.data.nombre);
        setValue('correo', response.data.correo);
        setValue('totalComision', response.data.totalComision);
      }
      else {
        alert("Id del Vendedor NO existe. Inténtelo con otro.")
      }

    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  };



const onSubmitSave = datos =>{
  console.log(datos)
  saveVendedor()
}

const onSubmitUpdate = datos =>{
  console.log(datos)
  updateVendedor(getValues("idVendedor"))
}


  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TouchableOpacity
        style={[styles.touchables, { backgroundColor: '#c71852' }]}
        onPress={()=>getVendedores()}
      >
        <Text style={{ color: 'yellow'}}>Listar Vendedores </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.touchables, { backgroundColor: 'aquamarine' }]}
        onPress={() => getVendedorPorId(getValues("idVendedor"))}
      >
        <Text style={{ color: 'red' }}>Buscar por Id</Text>
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
      
      <Controller
                control={control}                                
                rules={{
                    required:true, 
                    pattern: /^([a-zA-ZùÙüÜäàáëèéïìíöòóüùúÄÀÁËÈÉÏÌÍÖÒÓÜÚñÑ\s]+)$/,
                }}
                render={({field:{onChange, onBlur, value}})=>(
                    <TextInput
                        style={[styles.inputs, {borderColor: errors.nombre?.type=='required' || errors.nombre?.type=='pattern' ? 'red' : 'green'}]}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder='Nombre del vendedor'
                    />
                )}
                name='nombre'
            />
            {errors.nombre?.type=='required' && <Text style={{color:'red'}}>El nombre del vendedor es obligatorio.</Text>}
            {errors.nombre?.type=='pattern' && <Text style={{color:'red'}}>Solo se permiten letras o espacios.</Text>}

            <Controller
                control={control}                                
                rules={{
                    required:true, 
                    pattern: /([\w\.]+)@([\w\.]+)\.(\w+)/g,
                }}
                render={({field:{onChange, onBlur, value}})=>(
                    <TextInput
                        style={[styles.inputs, {borderColor: errors.correo?.type=='required' || errors.correo?.type=='pattern' ? 'red' : 'green'}]}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder='Correo del vendedor'
                    />
                )}
                name='correo'
            />
            {errors.correo?.type=='required' && <Text style={{color:'red'}}>El correo del vendedor es obligatorio.</Text>}
            {errors.correo?.type=='pattern' && <Text style={{color:'red'}}>Ingrese un correo válido.</Text>}
      
      <Controller
        control={control}
        render={({field:{onChange, onBlur, value}})=>(
          <TextInput
            style={[styles.inputs, {borderColor: errors.totalComision?.type=='required' || errors.totalComision?.type=='pattern' ? 'red' : 'green'}]}
            placeholder="Comisión"
            onChange={onChange}
            value={value}
            onBlur={onBlur}
          />
        )}
        name='totalComision'
      />

      <TouchableOpacity
        style={[styles.touchables, { backgroundColor: '#18c733', marginTop:10 }]}
        onPress={handleSubmit(onSubmitSave)}
      >
        <Text style={{ color: 'yellow' }}>Guardar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.touchables, { backgroundColor: '#0cc6ec' }]}
        onPress={handleSubmit(onSubmitUpdate)}
      >
        <Text style={{ color: 'yellow' }}>Actualizar</Text>
      </TouchableOpacity>

       {/* <TouchableOpacity
        style={[styles.touchables, { backgroundColor: 'red' }]}
        onPress={() => deleteCliente(idsearch)}
      > 
        <Text style={{ color: 'yellow' }}>Eliminar</Text>
      </TouchableOpacity> */}
      <Text>Listado de Vendedores</Text>
      {isLoading ? <ActivityIndicator size="large" color="red" /> : (
        <FlatList
          data={data}
          //keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.touchables, { backgroundColor: 'orange' }]}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.idVendedor} {item.nombre} {item.correo} {item.totalComision}</Text>
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