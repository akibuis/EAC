import { VisitorType } from "../models/VisitorType.js";

const VisitorTypeController = {
     createVisitorType : async(req, res) => {
         const{ name} = req.body;
         if(!name){
             return res.status(401).json({status:'fail', message: 'please enter visitor Category'})
         }
         try{
             const newVisitorType = new VisitorType(req.body);
             const visitorType = await newVisitorType.save();
             if(!visitorType){
                 return res
                 .status(401).json({status:'fail', message: 'something went wrong'})
             }
             return res
             .status(201)
             .json({status:'success', message: 'successful', data: visitorType})
         }catch(err) {
             return res.status(500).json({status:'fail', message:'server err',err})
         }
     },

     getVisitorType : async(req, res) =>{
         try{
             const VisitorTypes = await VisitorType.find({}).lean().exec();
             return res 
             .status(201)
             .json({status:'success', message: 'Successful', data: VisitorTypes})
         }catch(err) {
             return res.status(500).json({status:'fail', message:'server err', err})
         }
     },
     editVisitorType : async(req, res) =>{
         const {id} = req.params;
         const {name } = req.body;

         if(!name){
             return res
             .status(400).json({status:'fail', message: 'Select field to update'
            })
         }
         try{
            const visitorType = await VisitorType.findById(id).exec();
            visitorType.name = name;
            await visitorType.save();

            if(!visitorType)
            return res
            .status(404).json({status:'fail', message:'error updating'});
            return res.status(200).json({status:'success', message:'successful update', data: visitorType})
         }catch(err) {
             return res.status(500).json({status:'fail', message:'server err', err})
         }
        
    
     },
    removeVisitorTypes: async (req, res) => { 
    
        const { id } = req.params;
        try {
        const visitorType = await VisitorType.findById(id);
        visitorType.deleteOne();
        

        if (visitorType) {
            return res.status(200).json({ 
                status: 'success',
                message: 'visitor type removed', 
            });
        } 
        else {
            return res.status(400).json({ 
                status: 'fail',
                message: 'visitor type  not found.', 
            });
        }
            

        } catch (err) {
        return res.status(500).json({ 
            status: 'fail', 
            message: 'server err', 
            err 
            });
        }
    },
    removeAllVisitorTypes: async (req, res) => { 
        try {
        const visitorType = await VisitorType.deleteMany({visitorType});

        if (visitorType) {
            return res.status(200).json({ 
                status: 'success',
                message: 'All visitor types removed successfully', 
            });
        } 
        else {
            return res.status(400).json({ 
                status: 'fail',
                message: 'visitor type not found.', 
            });
        }
            

        } catch (err) {
        return res.status(500).json({ 
            status: 'fail', 
            message: 'server err', 
            err 
            });
        }
    },
}

export default VisitorTypeController;