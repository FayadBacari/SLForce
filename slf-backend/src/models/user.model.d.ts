import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    uid: string;
    email: string;
    role: "eleve" | "coach";
    passwordHash: string;
    createdAt: NativeDate;
    displayName?: string | null;
    coachProfile?: {
        skills: string[];
        avatar?: string | null;
        speciality?: string | null;
        location?: string | null;
        price?: number | null;
        experience?: number | null;
        description?: string | null;
    } | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    uid: string;
    email: string;
    role: "eleve" | "coach";
    passwordHash: string;
    createdAt: NativeDate;
    displayName?: string | null;
    coachProfile?: {
        skills: string[];
        avatar?: string | null;
        speciality?: string | null;
        location?: string | null;
        price?: number | null;
        experience?: number | null;
        description?: string | null;
    } | null;
}, {}, mongoose.DefaultSchemaOptions> & {
    uid: string;
    email: string;
    role: "eleve" | "coach";
    passwordHash: string;
    createdAt: NativeDate;
    displayName?: string | null;
    coachProfile?: {
        skills: string[];
        avatar?: string | null;
        speciality?: string | null;
        location?: string | null;
        price?: number | null;
        experience?: number | null;
        description?: string | null;
    } | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    uid: string;
    email: string;
    role: "eleve" | "coach";
    passwordHash: string;
    createdAt: NativeDate;
    displayName?: string | null;
    coachProfile?: {
        skills: string[];
        avatar?: string | null;
        speciality?: string | null;
        location?: string | null;
        price?: number | null;
        experience?: number | null;
        description?: string | null;
    } | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    uid: string;
    email: string;
    role: "eleve" | "coach";
    passwordHash: string;
    createdAt: NativeDate;
    displayName?: string | null;
    coachProfile?: {
        skills: string[];
        avatar?: string | null;
        speciality?: string | null;
        location?: string | null;
        price?: number | null;
        experience?: number | null;
        description?: string | null;
    } | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    uid: string;
    email: string;
    role: "eleve" | "coach";
    passwordHash: string;
    createdAt: NativeDate;
    displayName?: string | null;
    coachProfile?: {
        skills: string[];
        avatar?: string | null;
        speciality?: string | null;
        location?: string | null;
        price?: number | null;
        experience?: number | null;
        description?: string | null;
    } | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=user.model.d.ts.map