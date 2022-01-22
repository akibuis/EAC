import {Visitor} from '../models/Visitor.js'





const VisitorController = {
     createVisitor : async(req, res) => {

         const user = req.params._id;
        //  console.log(req.body.user.id)
         const{visitorType,visitorCode,buildingNo, name,profession,timeIn} = req.body;
         const body = req.body
         if(!name || !visitorType || !visitorCode || !buildingNo || !timeIn) {
             return res.status(401).json({status:'fail', message: 'please enter all the neccessary fields'})
         }
         try{
             const newVisitor = new Visitor(req.body, user);
             const visitor = await newVisitor.save().populate('visitorType', 'name');
             if(!visitor){
                 return res
                 .status(401).json({status:'fail', message: 'something went wrong'})
             }
             return res
             .status(201)
             .json({status:'success', message: 'successful', data: visitor})
         }catch(err) {
             return res.status(500).json({status:'fail', message:'server err',err})
         }
     },

     getVisitors : async(req, res) =>{
         try{
             const Visitors = await Visitor.find({}).lean().exec();
             return res 
             .status(201)
             .json({status:'success', message: 'Successful', data: Visitors})
         }catch(err) {
             return res.status(500).json({status:'fail', message:'server err', err})
         }
     },
     editVisitor : async(req, res) =>{
         const {id} = req.params;
         const {title, message} = req.body;

         if(!title || !message){
             return res
             .status(400).json({status:'fail', message: 'Select field to update'
            })
         }
         try{
            const visitor = await Visitor.findById(id).exec();
            visitor.title = title;
            visitor.message = message;
            await Visitor.save();

            if(!visitor)
            return res
            .status(404).json({status:'fail', message:'error updating'});
            return res.status(200).json({status:'success', message:'successful update', data: visitor})
         }catch(err) {
             return res.status(500).json({status:'fail', message:'server err', err})
         }
        
    
     },
    //  removeVisitorTypes: async (req, res) => { 
    
    //     const { id } = req.params;
    //     try {
    //     const visitorType = await VisitorType.findById(id);
    //     visitorType.deleteOne();
        

    //     if (visitorType) {
    //         return res.status(200).json({ 
    //             status: 'success',
    //             message: 'visitor type removed', 
    //         });
    //     } 
    //     else {
    //         return res.status(400).json({ 
    //             status: 'fail',
    //             message: 'visitor type  not found.', 
    //         });
    //     }
            

    //     } catch (err) {
    //     return res.status(500).json({ 
    //         status: 'fail', 
    //         message: 'server err', 
    //         err 
    //         });
    //     }
    // },
    // removeAllVisitorTypes: async (req, res) => { 
    //     try {
    //     const visitorType = await VisitorType.deleteMany({visitorType});

    //     if (visitorType) {
    //         return res.status(200).json({ 
    //             status: 'success',
    //             message: 'All visitor types removed successfully', 
    //         });
    //     } 
    //     else {
    //         return res.status(400).json({ 
    //             status: 'fail',
    //             message: 'visitor type not found.', 
    //         });
    //     }
            

    //     } catch (err) {
    //     return res.status(500).json({ 
    //         status: 'fail', 
    //         message: 'server err', 
    //         err 
    //         });
    //     }
    // },
}
export default VisitorController;