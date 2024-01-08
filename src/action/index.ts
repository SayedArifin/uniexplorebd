"use server"
import { db } from "@/lib/db";
import { Branch, DepartmentBranch, Prisma, University, User, UserRole } from "@prisma/client";
import { Session } from "next-auth";
import { authOptions } from "@/app/option";
export const userRole = async (email?: string | null | undefined) => {
    if (email) {
        const roleData = await db.user.findFirst({
            where: {
                email
            },
            select: {
                role: true,
            },
        });

        const role = roleData?.role;
        return role;
    } else {
        const role = "unauthenticated";
        return role;
    }
};

export const undateUniversity = async (id: string, data: University) => {
    if (id && data) {
        const res = await db.university.update({
            where: {
                id
            }, data
        })
        return res.id
    } else {
        return;
    }
}
export const fetchDpt = async () => {
    const allDpt = await db.department.findMany({
        select: {
            shortName: true, id: true
        }
    });
    return allDpt
}
export const makeBatch = async (data: any) => {
    const { name, address, helpline, selected, id } = data;
    const createdBranch = await db.branch.create({
        data: {
            name,
            address,
            helpline,
            universityId: id,
            departments: {
                create: selected.map((dpt: any) => ({
                    department: { connect: { id: dpt.value } },
                    cost: 0,
                    credit: 0,
                })),
            },
        },
    });

    return createdBranch;
};
export const deleteBranch = async (id: string) => {
    await db.branch.delete({
        where: {
            id
        }
    })
    return;
}

export const modifyDepartment = async (id: string, data: any) => {
    await db.departmentBranch.update({
        where: {
            id
        }, data
    })


}
export const FeaturedUniversityEdit = async (id: string, university_name: string, image_url: string, href: string | null,) => {
    const response = await db.featuredUniversity.update({
        where: {
            id: id
        },
        data: {
            university_name, image_url, href
        }
    })
    return response;

}
export const FeaturedUniversityAdd = async (university_name: string, image_url: string, href: string | null,) => {
    const response = await db.featuredUniversity.create({
        data: {
            university_name, image_url, href
        }
    })
    return response;

}

export const FeaturedUniversityDelete = async (id: string) => {
    const response = await db.featuredUniversity.delete({
        where: { id }
    });
}

export const BannerAdd = async (title: string, image_url: string, href: string | null,) => {
    const response = await db.carousel.create({
        data: {
            title, image_url, href
        }
    })
    return response;

}

export const BannerDelete = async (id: string) => {
    const response = await db.featuredUniversity.delete({
        where: { id }
    });
}
export const UpdateUserRole = async (id: string, role: any) => {
    const response = await db.user.update({
        where: { id },
        data: {
            role
        }

    });
    return response;
}
import { getServerSession } from "next-auth";



interface UserInfo {
    session: Session | null;
    role: {
        role: string | null;
    } | null;
}

export const userInfo = async (): Promise<UserInfo> => {
    let role = null;

    const session = await getServerSession(authOptions);
    if (session) {
        role = await db.user.findFirst({
            where: { email: session?.user?.email as string },
            select: { role: true },
        });
    }

    return { session, role };
};



export const userDetail = async () => {
    let details = null;

    const session = await getServerSession(authOptions);
    if (session) {
        details = await db.user.findFirst({
            where: { email: session?.user?.email as string },

        });
    }

    return { details };
};

export const allDept = async () => {
    const dpt = await db.department.findMany({
        select: {
            id: true, shortName: true
        }
    })
    return dpt;
}
export const universitiesWithDepartmentId = async (id: string) => {
    const universitiesWithDepartmentId = await db.university.findMany({
        where: {
            branches: {
                some: {
                    departments: {
                        some: {
                            department: {
                                id
                            }
                        }
                    }
                }
            }
        }, select: {
            id: true,
            university_name: true,
        },
    });

    return universitiesWithDepartmentId;
};

export const CompareUniversity = async (data: any, choosedDpt: string) => {
    const universityIds = data.map((university: any) => university.value);
    const universitiesWithDepartment = await db.university.findMany({

        where: {
            id: {
                in: universityIds,
            },
        },
        include: {
            branches: {
                include: {
                    departments: {
                        where: {
                            departmentId: choosedDpt,
                        },
                        include: {
                            department: true,
                        },
                    },
                },
            },
        },
    });
    return universitiesWithDepartment;
}