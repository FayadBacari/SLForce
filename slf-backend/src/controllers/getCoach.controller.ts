import User from '../models/user';
import { Request, Response } from 'express';



export const getAllCoachs = async (req: Request, res: Response) => {
    try {
        const coachs = await User.find({ role: 'coach' }).select('-password');
        res.status(200).json({ coachs });
    } catch (error) {
        console.error('❌ Error fetching coachs:', error);
        res.status(500).json({ message: "Impossible de récupérer les coachs" });
    }
};

export const getCoachById = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).select('-password');

        if (!user || user.role !== 'coach') {
            return res.status(404).json({ message: "Coach introuvable" });
        }

        res.status(200).json({ coach: user });
    } catch (error) {
        console.error('❌ Error fetching coach by ID:', error);
        res.status(500).json({ message: "Impossible de récupérer le coach" });
    }
};

export const updateCoachProfile = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const coachProfileData = req.body.coachProfile;

        if (!coachProfileData) {
            return res.status(400).json({ message: "Données coachProfile manquantes" });
        }

        const user = await User.findById(userId);

        if (!user || user.role !== 'coach') {
            return res.status(404).json({ message: "Coach introuvable" });
        }

        if (!user.coachProfile) {
            user.coachProfile = {
                name: "",
                avatar: "",
                speciality: "",
                location: "",
                price: 0,
                experience: 0,
                description: "",
                skills: [],
            };
        }

        user.coachProfile.name = coachProfileData.name ?? user.coachProfile.name;
        user.coachProfile.avatar = coachProfileData.avatar ?? user.coachProfile.avatar;
        user.coachProfile.speciality = coachProfileData.speciality ?? user.coachProfile.speciality;
        user.coachProfile.location = coachProfileData.location ?? user.coachProfile.location;
        user.coachProfile.price = Number(coachProfileData.price ?? user.coachProfile.price);
        user.coachProfile.experience = Number(coachProfileData.experience ?? user.coachProfile.experience);
        user.coachProfile.description = coachProfileData.description ?? user.coachProfile.description;
        user.coachProfile.skills = coachProfileData.skills ?? user.coachProfile.skills;

        await user.save();

        return res.status(200).json({
            message: "Profil coach mis à jour ✔️",
            coachProfile: user.coachProfile
        });

    } catch (error) {
        console.error("❌ Error updating coach profile:", error);
        return res.status(500).json({ message: "Impossible de mettre à jour le profil coach" });
    }
};