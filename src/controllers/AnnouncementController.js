import{Announcement} from '../models/Announcement.js';

const AnnouncementController = {
     createAnnouncement : async(req, res) => {
         const{ title , message} = req.body;
         if(!title || !message){
             return res.status(401).json({status:'fail', message: 'please enter title and message'})
         }
         try{
             const newAnnouncement = new Announcement(req.body);
             const announcement = await newAnnouncement.save();
             if(!announcement){
                 return res
                 .status(401).json({status:'fail', message: 'something went wrong'})
             }
             return res
             .status(201)
             .json({status:'success', message: 'successful', data: announcement})
         }catch(err) {
             return res.status(500).json({status:'fail', message:'server err',err})
         }
     },

     getAnnouncement : async(req, res) =>{
         try{
             const Announcements = await Announcement.find({}).lean().exec();
             return res 
             .status(201)
             .json({status:'success', message: 'Successful', data: Announcements})
         }catch(err) {
             return res.status(500).json({status:'fail', message:'server err', err})
         }
     },
     editAnnouncement : async(req, res) =>{
         const {id} = req.params;
         const {title, message} = req.body;

         if(!title || !message){
             return res
             .status(400).json({status:'fail', message: 'Select field to update'
            })
         }
         try{
            const announcement = await Announcement.findById(id).exec();
            announcement.title = title;
            announcement.message = message;
            await announcement.save();

            if(!announcement)
            return res
            .status(404).json({status:'fail', message:'error updating'});
            return res.status(200).json({status:'success', message:'successful update', data: announcement})
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
export default AnnouncementController;