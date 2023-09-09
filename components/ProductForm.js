import Layout from "@/components/Layout";
import {useEffect,useState} from 'react';
import axios from 'axios';
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";


export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
    category: assignedCategory,
    properties: assignedProperties,
}){
    const [title, setTitle] = useState(existingTitle || '');
    const [productProperties, setProductProperties] = useState(assignedProperties || {});
    const [description, setDescription] = useState(existingDescription || '');
    const [category, setCategory] = useState(assignedCategory || ''); 
    const [price, setPrice] = useState(existingPrice || '');
    const [images, setImages] = useState(existingImages || []);
    const [goToProduct,setGoToProduct] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [categories, setCategories] = useState([]); 
    const router = useRouter();
    

    useEffect(()=>{
        axios.get('/api/categories').then(result =>{
            setCategories(result.data);
        })
    },[])

    async function saveProduct(e){
        e.preventDefault();

        const data = {title, description, price, images, category, 
            properties: productProperties};
        if(_id){
            //update
            await axios.put('/api/products',{...data,_id})
        }
        else{
            //create 
            await axios.post('/api/products', data);
        }
        setGoToProduct(true);
    }

    if(goToProduct){
        router.push('/products')
    }

    async function uploadImg(e){
       const files = e.target?.files;
       if(files?.length > 0){
        setIsUploading(true);
        const data = new FormData();
        for(const file of files){
            data.append('file', file)
        }
        const res = await axios.post('/api/upload', data)
        setImages(oldImages =>{
            return [...oldImages, ...res.data.links];
        });
        setIsUploading(false)
       }
    }

    async function updateImagesOrder(images){
        setImages(images)
    }

    function setProductProp(propName,value){
        setProductProperties(prev =>{
            const newProductProps = {...prev};
            newProductProps[propName] = value; 
            return newProductProps;
        })
    }

    const propertiesToFill = [];
        if (categories.length > 0 && category) {
            let catInfo = categories.find(({_id}) => _id === category);
            propertiesToFill.push(...catInfo.properties);
            // while(catInfo?.parent?._id){
            //     const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id);
            //     propertiesToFill.push(...parentCat.properties)
            //     catInfo = parentCat;
            // }

        }

    return (
            <form onSubmit={saveProduct}>

                <label>Product Name: </label>
                <input 
                    type="text" 
                    placeholder="product name" 
                    value={title} 
                    onChange={(e)=>{setTitle(e.target.value)}}/>
                
                <label>Category: </label>
                <select value={category} 
                        onChange={e => setCategory(e.target.value)}>
                    <option value="">Uncategorized</option>
                    {categories.length > 0 && categories.map(category => (
                        <option value={category._id}>{category.name}</option>
                    ))}
                </select>
                {propertiesToFill.length > 0 && propertiesToFill.map( p => (
                    <div className="">
                        <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
                        <div>
                            <select value={productProperties[p.name]} onChange = {e => setProductProp(p.name, e.target.value)}>
                                {p.values.map( v => (
                                    <option value = {v}>{v}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}

                <label>Photos: </label>
                <div className="mb-2 flex flex-wrap gap-2">
                    <ReactSortable list={images} setList={updateImagesOrder} className="flex flex-wrap gap-1">
                    {!!images?.length && images.map(link =>(
                        <div key = {link} className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
                            <img src={link} alt ="" className="rounded-lg"/>
                        </div>
                    ))}
                    </ReactSortable>

                    {isUploading && (
                        <div className="h-24 flex items-center">
                            <Spinner />
                        </div>

                    )}

                    <label className="w-24 h-24 text-center flex flex-col items-center justify-center text-sm gap-1 text-gray-500 rounded-sm bg-white shadow-sm border border-gray-200 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                        </svg>
                        <div>Upload</div>
                        <input type="file" className="hidden" onChange={uploadImg}/>
                    </label>
                </div>
                <label>Product Description: </label>
                <textarea 
                    placeholder="description" 
                    value={description}
                    onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                <label>Product Price (in USD): </label>
                <input 
                    type="number" 
                    placeholder="price" 
                    value={price} 
                    onChange={(e)=>{setPrice(e.target.value)}}/>
                <button className="btn-primary" type="submit">Save</button>
            </form>
    )
}