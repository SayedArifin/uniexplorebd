/* eslint-disable jsx-a11y/alt-text */
"use client"
import React, { useEffect, useState } from 'react';
import { PDFViewer, PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, Input, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea } from '@nextui-org/react';
import { Label } from '@/components/ui/label';
import { MinusCircle, PlusCircle } from 'lucide-react';
import emailjs from '@emailjs/browser'
import { toast } from 'sonner';
interface Education {
    name: string;
    year: string;
    gpa: string;
}

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
    container: {
        margin: '5px 5px 0',
        boxShadow: '1px 1px 2px #DAD7D7',
        borderRadius: 3,
        padding: 5,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        fontSize: 13,
        borderBottom: "3px double #000",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 5,
    },
    heading: {
        fontSize: 18,
        textAlign: 'center',
        flexDirection: "row",
        color: "red"
    },
    items: {
        fontSize: 12,
        color: "#3B3B3A"
    },
    itemsData: { color: "black", fontSize: "14" },
    table: {
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        marginBottom: 10
    },
    tableRow: {
        flexDirection: 'row'
    },
    tableCell: {
        padding: 5,
        borderWidth: 1,
        borderColor: '#bfbfbf',
        width: '100%',
    },
    tableHeader: {
        padding: 5,
        borderWidth: 1,
        borderColor: '#bfbfbf',
        color: '#000000',
        width: '100%',
    },
    listItem: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    bulletPoint: {
        fontSize: 10,
        marginRight: 5,
    },
    listItemText: {
        fontSize: 12,
    },
    section: {
        marginBottom: 10,
    },
});

const getImageDataUrl = async (imageUrl: string): Promise<string> => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
};

const CVBuilder: React.FC = () => {
    const [photoUrl, setPhotoUrl] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [dob, setDob] = useState<string>('');
    const [fatherName, setFatherName] = useState<string>('');
    const [motherName, setMotherName] = useState<string>('');
    const [permanentAddress, setPermanentAddress] = useState<string>('');
    const [presentAddress, setPresentAddress] = useState<string>('');
    const [religion, setReligion] = useState<string>('');
    const [about, setAbout] = useState<string>('');
    const [education, setEducation] = useState<Education[]>([{ name: '', year: '', gpa: '' }]);
    const [universityName, setUniversityName] = useState<string>('');
    const [universityAddress, setUniversityAddress] = useState<string>('');
    const [eiin, setEiin] = useState<string>('');
    const [position, setPosition] = useState<string>('');
    const [joiningYear, setJoiningYear] = useState<string>('');
    const [engSpeaking, setEngSpeaking] = useState<string>('');
    const [engWriting, setEngWriting] = useState<string>('');
    const [banSpeaking, setBanSpeaking] = useState<string>('');
    const [banWriting, setBanWriting] = useState<string>('');
    const [loginEmail, setLoginEmail] = useState<string>('');
    const [supportingEmail, setSupportingEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'photoUrl':
                setPhotoUrl(value);
                break;
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'dob':
                setDob(value);
                break;
            case 'fatherName':
                setFatherName(value);
                break;
            case 'motherName':
                setMotherName(value);
                break;
            case 'permanentAddress':
                setPermanentAddress(value);
                break;
            case 'presentAddress':
                setPresentAddress(value);
                break;
            case 'religion':
                setReligion(value);
                break;
            case 'about':
                setAbout(value);
                break;
            default:
                break;
        }
    };

    const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const { name, value } = e.target;
        const updatedEducation = [...education];
        updatedEducation[index] = {
            ...updatedEducation[index],
            [name]: value
        };
        setEducation(updatedEducation);
    };

    const addEducationRow = () => {
        setEducation([...education, { name: '', year: '', gpa: '' }]);
    };

    const removeEducationRow = (index: number) => {
        const updatedEducation = [...education];
        updatedEducation.splice(index, 1);
        setEducation(updatedEducation);
    };

    const CVDocument = () => (
        <Document>
            <Page size="A4" style={{ fontFamily: "Oswald" }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View>
                            {(photoUrl && <Image src={photoUrl} style={styles.image} />)}
                        </View>
                        <View>
                            <View style={{
                                fontSize: 24,
                                textAlign: 'center',
                                fontFamily: 'Oswald',
                                display: "flex",
                                flexDirection: "row",
                            }}>
                                <Text style={{ marginRight: 5, textTransform: "capitalize" }}>{firstName}</Text>
                                <Text style={{ color: "red", textTransform: "capitalize" }}>{lastName}</Text>
                            </View>
                            <View>
                                <Text style={{ color: "#3B3B3A" }}>Login Email: {loginEmail}</Text>
                                <Text style={{ color: "#3B3B3A" }}>Support Email: {supportingEmail}</Text>
                                <Text style={{ color: "#3B3B3A" }}>Mobile No: {phoneNumber}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        fontSize: 20,
                        textAlign: 'center',
                        fontFamily: 'Oswald',
                        display: "flex",
                        justifyContent: 'center',
                        borderBottom: "3px double #000",
                    }}>
                        <Text>{universityName} (EIIN:{eiin})</Text>
                        <Text style={{ fontSize: 8, color: "red" }}>{universityAddress}</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 14 }}>{about}</Text>
                    </View>
                    <View style={styles.items}>
                        <Text style={styles.heading}>General Information</Text>
                        <View>
                            <Text>Date of Birth:<Text style={styles.itemsData}>{dob}</Text></Text>
                            <Text>Father&lsquo;s Name:<Text style={styles.itemsData}>{fatherName}</Text></Text>
                            <Text>Mother&lsquo;s Name:<Text style={styles.itemsData}>{motherName}</Text></Text>
                            <Text>Permanent Address:<Text style={styles.itemsData}>{permanentAddress}</Text></Text>
                            <Text>Present Address:<Text style={styles.itemsData}>{presentAddress}</Text></Text>
                            <Text>Religion: <Text style={styles.itemsData}>{religion}</Text></Text>
                        </View>
                    </View>
                    <View style={styles.items}>
                        <Text style={styles.heading}>Educational Qualification</Text>
                        <View>

                            <View style={styles.table}>
                                <View style={styles.tableRow}>
                                    <Text style={styles.tableHeader}>Examination</Text>
                                    <Text style={styles.tableHeader}>Passing Year</Text>
                                    <Text style={styles.tableHeader}>GPA/CGPA</Text>
                                </View>
                                {education.map((edu) => (
                                    <View key={edu.name} style={styles.tableRow}>
                                        <Text style={styles.tableCell}>{edu.name}</Text>
                                        <Text style={styles.tableCell}>{edu.year}</Text>
                                        <Text style={styles.tableCell}>{edu.gpa}</Text>
                                    </View>
                                ))}
                            </View>

                        </View>
                        <Text style={{ fontSize: 8, color: "red" }}>*Please attach all certificates upon application.</Text>
                        <View style={styles.items}>
                            <Text style={styles.heading}>Language</Text>
                            <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
                                <View>
                                    <Text style={{ fontSize: 13 }}>English</Text>
                                    <Text>   Writing:<Text style={styles.itemsData}>{engWriting}</Text></Text>
                                    <Text>   Speaking:<Text style={styles.itemsData}>{engSpeaking}</Text></Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 13 }}>Bangla</Text>
                                    <Text>   Writing:<Text style={styles.itemsData}>{banWriting}</Text></Text>
                                    <Text>   Speaking:<Text style={styles.itemsData}>{banSpeaking}</Text></Text>
                                </View>

                            </View>
                            <Text style={{ fontSize: 8, color: "red" }}>*An interview will be conducted.</Text>
                        </View>
                        <View style={styles.items}>
                            <Text style={styles.heading}>Position at University</Text>
                            <Text>Working Position:<Text style={styles.itemsData}>{position}</Text></Text>
                            <Text>Joining Year:<Text style={styles.itemsData}>{joiningYear}</Text></Text>
                            <Text style={{ fontSize: 8, color: "red" }}>*Please attach your university-issued ID card.</Text>
                        </View>
                    </View>
                    <View style={{ fontSize: 10, gap: 5, marginVertical: 10 }}>
                        <Text>I hereby affirm that all information provided in my application for the position of University Representative is accurate, and I possess sufficient documentation to substantiate these claims. Additionally, I acknowledge my appointment by the university and affirm my qualifications to effectively execute my duties for this institution.</Text>
                        <Text>I understand and accept that my tenure in this role is subject to the terms and conditions set forth by both my university and UniExplore-BD. Should any discrepancies arise, I consent to the possibility of being relieved of my responsibilities in accordance with these terms.</Text>
                        <Text>Furthermore, I am aware that my expenses and salary will be covered by the university, not UniExplore-BD.</Text>
                        <Text style={{ fontSize: 12, color: "red" }}>I acknowledge that by signing below, I confirm my understanding and acceptance of the terms stated above.</Text>
                        <View style={{ gap: 60, textAlign: "right" }}>
                            <View>
                                <Text>{firstName} {lastName}</Text>
                                <Text>{universityName}</Text>
                            </View>

                            <Text>Date: ............./............/.....................</Text>

                        </View>
                        <View style={{ width: "100%", height: "100px", border: "2px solid red", marginTop: "20px" }}>
                            <Text style={{ fontSize: 8, marginLeft: 5 }}>Date, official seal, signature with name from the authority</Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={{ marginBottom: 10 }}>Please make sure to attach the following documents upon submission:</Text>
                            <View style={styles.listItem}>
                                <Text style={styles.bulletPoint}>•</Text>
                                <Text style={styles.listItemText}>National ID (Both sides)</Text>
                            </View>
                            <View style={styles.listItem}>
                                <Text style={styles.bulletPoint}>•</Text>
                                <Text style={styles.listItemText}>Appointment Letter from University</Text>
                            </View>
                            <View style={styles.listItem}>
                                <Text style={styles.bulletPoint}>•</Text>
                                <Text style={styles.listItemText}>Educational Certificates</Text>
                            </View>
                            <View style={styles.listItem}>
                                <Text style={styles.bulletPoint}>•</Text>
                                <Text style={styles.listItemText}>Interview Clearance or IELTS Certificate</Text>
                            </View>
                            <View style={styles.listItem}>
                                <Text style={styles.bulletPoint}>•</Text>
                                <Text style={styles.listItemText}>Any other relevant document</Text>
                            </View>
                        </View>
                    </View>


                </View>
                <View style={{ alignItems: "center" }}>
                    <Image style={{ width: "40%" }} src={"/unilogo.png"} />
                </View>
            </Page>
        </Document>
    );

    const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const dataUrl = await getImageDataUrl(URL.createObjectURL(file));
            setPhotoUrl(dataUrl);
        }
    };

    const religions = [
        { label: "Christianity", value: "christianity" },
        { label: "Islam", value: "islam" },
        { label: "Hinduism", value: "hinduism" },
        { label: "Buddhism", value: "buddhism" },
        { label: "Sikhism", value: "sikhism" },
        { label: "Judaism", value: "judaism" },
        { label: "Other", value: "other" }
    ];
    const proficiencyLevels = [
        "A1 - Beginner",
        "A2 - Elementary",
        "B1 - Intermediate",
        "B2 - Upper Intermediate",
        "C1 - Advanced",
        "C2 - Proficiency"
    ];

    const [isClient, setIsClient] = useState<boolean>(false);
    useEffect(() => {
        setIsClient(true);
    }, [])
    useEffect(() => {
        const isAllFieldsFilled = !!(
            firstName.trim() &&
            lastName.trim() &&
            dob.trim() &&
            fatherName.trim() &&
            motherName.trim() &&
            permanentAddress.trim() &&
            presentAddress.trim() &&
            religion.trim() &&
            about.trim() &&
            education.every(edu => edu.name.trim() && edu.year.trim() && edu.gpa.trim()) &&
            universityName.trim() &&
            universityAddress.trim() &&
            eiin.trim() &&
            position.trim() &&
            joiningYear.trim() &&
            engSpeaking.trim() &&
            engWriting.trim() &&
            banSpeaking.trim() &&
            banWriting.trim() &&
            loginEmail.trim() &&
            supportingEmail.trim() &&
            phoneNumber.trim()
        );

        setIsComplete(isAllFieldsFilled);
    }, [firstName, lastName, dob, fatherName, motherName, permanentAddress, presentAddress, religion, about, education, universityName, universityAddress, eiin, position, joiningYear, engSpeaking, engWriting, banSpeaking, banWriting, loginEmail, supportingEmail, phoneNumber]);
    const templateParams = {

        to_email: [loginEmail, supportingEmail],
    };
    const sendEmail = async () => {
        try {
            await emailjs.send("service_qwy3r2c", "template_1pq3exr", templateParams, {
                publicKey: "WOdvkPI7BHSRkPWCr",

            })
            toast.success("Email sent")
        } catch (error) {
            toast.error("Error sending")
            console.log(error)
        }
    }

    return (
        <div className="container  mx-auto p-4">
            <form>
                <Card>
                    <CardHeader>
                        <CardTitle>Application Form</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-5'>
                        <Card>
                            <CardHeader>
                                <CardTitle>General Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Input name="photoUrl" label="Upload Your Passport Size Image" labelPlacement="outside-left" variant="flat" type="file" accept="image/*" onChange={handlePhotoChange} isRequired />
                                <Input name="firstName" label="Your First Name" variant='underlined' isRequired value={firstName} onChange={handleInputChange} />
                                <Input name="lastName" label="Your Last Name" variant='underlined' isRequired value={lastName} onChange={handleInputChange} />
                                <Input labelPlacement='outside-left' type='date' name="dob" label="Date of Birth" variant='underlined' isRequired value={dob} onChange={handleInputChange} />
                                <Input name="fatherName" label="Father‘s Name" variant='underlined' isRequired value={fatherName} onChange={handleInputChange} />
                                <Input name="motherName" label="Mother‘s Name" variant='underlined' isRequired value={motherName} onChange={handleInputChange} />
                                <Textarea name="permanentAddress" label="Permanent Address" variant='underlined' isRequired value={permanentAddress} onChange={handleInputChange} />
                                <Textarea name="presentAddress" label="Present Address" variant='underlined' isRequired value={presentAddress} onChange={handleInputChange} />
                                <Select
                                    name="religion"
                                    label="Your Religion"
                                    variant='underlined'
                                    isRequired
                                    value={religion}
                                    onChange={e => setReligion(e.target.value)}
                                >
                                    {religions.map((religion) => (
                                        <SelectItem key={religion.value} value={religion.value}>
                                            {religion.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <Textarea name="about" label="About You" variant='underlined' isRequired value={about} onChange={handleInputChange} />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Educational Qualification</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table aria-label="Education">
                                    <TableHeader>
                                        <TableColumn>Education</TableColumn>
                                        <TableColumn>Passing Year</TableColumn>
                                        <TableColumn>GPA/CGPA</TableColumn>
                                        <TableColumn>Action</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {education.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell><Input placeholder='eg:SSC' name={`name`} value={item.name} onChange={(e) => handleEducationChange(e, index)} /></TableCell>
                                                <TableCell><Input type="year" placeholder='eg:2000' name={`year`} value={item.year} onChange={(e) => handleEducationChange(e, index)} /></TableCell>
                                                <TableCell><Input type='number' placeholder='eg:4.56' name={`gpa`} value={item.gpa} onChange={(e) => handleEducationChange(e, index)} /></TableCell>
                                                <TableCell>
                                                    <Button isIconOnly onClick={() => removeEducationRow(index)} ><MinusCircle /></Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <Button className='w-full' onClick={addEducationRow}><PlusCircle /></Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>University Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Input name="UniversityName" label="University Name" variant='underlined' isRequired value={universityName} onChange={e => setUniversityName(e.target.value)} />
                                <Textarea name="UniversityHeadOffice" label="University Head Office" variant='underlined' isRequired value={universityAddress} onChange={e => setUniversityAddress(e.target.value)} />
                                <Input name="Position" label="Your Position" variant='underlined' isRequired value={position} onChange={e => setPosition(e.target.value)} />
                                <Input type='number' name="joiningYear" label="Joining Year" variant='underlined' isRequired value={joiningYear} onChange={e => setJoiningYear(e.target.value)} />
                                <Input type='number' name="eiin" label="EIIN Number" variant='underlined' isRequired value={eiin} onChange={e => setEiin(e.target.value)} />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Language Skill</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Label>English:</Label>
                                <div className="flex justify-between gap-5">
                                    <Select
                                        name="emglishSpeaking"
                                        label="Writing"
                                        variant='underlined'
                                        isRequired
                                        value={engSpeaking}
                                        onChange={e => setEngSpeaking(e.target.value)}
                                    >
                                        {proficiencyLevels.map((level) => (
                                            <SelectItem key={level} value={level}>
                                                {level}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <Select
                                        name="emglishSpeaking"
                                        label="Speaking"
                                        variant='underlined'
                                        isRequired
                                        value={engWriting}
                                        onChange={e => setEngWriting(e.target.value)}
                                    >
                                        {proficiencyLevels.map((level) => (
                                            <SelectItem key={level} value={level}>
                                                {level}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                                <Label>Bangla:</Label>
                                <div className="flex justify-between gap-5">
                                    <Select
                                        name="banSpeaking"
                                        label="Writing"
                                        variant='underlined'
                                        isRequired
                                        value={banSpeaking}
                                        onChange={e => setBanSpeaking(e.target.value)}
                                    >
                                        {proficiencyLevels.map((level) => (
                                            <SelectItem key={level} value={level}>
                                                {level}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <Select
                                        name="banWriting"
                                        label="Speaking"
                                        variant='underlined'
                                        isRequired
                                        value={banWriting}
                                        onChange={e => setBanWriting(e.target.value)}
                                    >
                                        {proficiencyLevels.map((level) => (
                                            <SelectItem key={level} value={level}>
                                                {level}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Contect Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Input type='email' name="loginEmail" label="Email for Login" variant='underlined' isRequired value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
                                <Input type='email' name="supportEmail" label="Email for Support" variant='underlined' isRequired value={supportingEmail} onChange={e => setSupportingEmail(e.target.value)} />
                                <Input type='number' name="phoneNumber" label="Phone Number" variant='underlined' isRequired value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                            </CardContent>
                        </Card>

                        <div>

                            <Button onClick={sendEmail} type='submit' disabled={!isComplete} className='w-full' isLoading={!isComplete}>
                                {isClient && (
                                    <PDFDownloadLink document={<CVDocument />} fileName={"application form.pdf"}>
                                        {({ }) => (isComplete ? 'Download Application Form' : 'Please Complete All Fields')}
                                    </PDFDownloadLink>
                                )}
                            </Button>



                        </div>

                    </CardContent>
                </Card>
            </form>

        </div>
    );
};

export default CVBuilder;
