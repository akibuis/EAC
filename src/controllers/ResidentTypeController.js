import { ResidentType } from "../models/ResidentType.js";

const ResidentTypeController = {
     createResidentType : async(req, res) => {
         const{ name} = req.body;
         if(!name){
             return res.status(401).json({status:'fail', message: 'please enter RESIDENT Category'})
         }
         try{
             const newResidentType = new ResidentType(req.body);
             const residentType = await newResidentType.save();
             if(!residentType){
                 return res
                 .status(401).json({status:'fail', message: 'something went wrong'})
             }
             return res
             .status(201)
             .json({status:'success', message: 'successful', data: residentType})
         }catch(err) {
             return res.status(500).json({status:'fail', message:'server err',err})
         }
     },

     getResidentType : async(req, res) =>{
         try{
             const ResidentTypes = await ResidentType.find({}).lean().exec();
             return res 
             .status(201)
             .json({status:'success', message: 'Successful', data: ResidentTypes})
         }catch(err) {
             return res.status(500).json({status:'fail', message:'server err', err})
         }
     },
     editResidentType : async(req, res) =>{
         const {id} = req.params;
         const {name } = req.body;

         if(!name){
             return res
             .status(400).json({status:'fail', message: 'Select field to update'
            })
         }
         try{
            const residentType = await ResidentType.findById(id).exec();
            residentType.name = name;
            await residentType.save();

            if(!residentType)
            return res
            .status(404).json({status:'fail', message:'error updating'});
            return res.status(200).json({status:'success', message:'successful update', data: residentType})
         }catch(err) {
             return res.status(500).json({status:'fail', message:'server err', err})
         }
        
    
     }
}
export default ResidentTypeController;