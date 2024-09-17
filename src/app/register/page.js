"use client";

import { useState } from "react";
import {
  Heading,
  Input,
  Button,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Textarea,
  Radio,
  Stack,
  Progress,
  Image,
  useToast,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../../utils/firebase"; // Ensure storage is imported
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import functions for storage
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';

export default function Register() {
  // Step and Progress State
  const [step, setStep] = useState(1);
  const stepsTotal = 5;

  // User Details State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [businessLogo, setBusinessLogo] = useState(null);

  // Professional Profile State
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [experience, setExperience] = useState("");
  const [services, setServices] = useState([]);
  const [serviceArea, setServiceArea] = useState([]);
  const [pricing, setPricing] = useState("");
  const [plan, setPlan] = useState("basic");

  const toast = useToast();

  // Predefined regions and services
  const regionOptions = [
    { value: "Tunis", label: "Tunis" },
    { value: "Sousse", label: "Sousse" },
    { value: "Monastir", label: "Monastir" },
    { value: "Sfax", label: "Sfax" },
  ];

  const serviceOptions = [
    { value: "Plomberie", label: "Plomberie" },
    { value: "Électricité", label: "Électricité" },
    { value: "Rénovation", label: "Rénovation" },
    { value: "Aménagement", label: "Aménagement" },
  ];

  // Handle Registration
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Upload profile picture
      let profilePicURL = '';
      if (profilePic) {
        const profilePicRef = ref(storage, `profile_pics/${user.uid}`);
        await uploadBytes(profilePicRef, profilePic);
        profilePicURL = await getDownloadURL(profilePicRef);
      }

      // Upload business logo
      let businessLogoURL = '';
      if (businessLogo) {
        const businessLogoRef = ref(storage, `business_logos/${user.uid}`);
        await uploadBytes(businessLogoRef, businessLogo);
        businessLogoURL = await getDownloadURL(businessLogoRef);
      }

      // Store user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        phoneNumber,
        profilePic: profilePicURL,
        businessName,
        businessType,
        registrationNumber,
        experience,
        services,
        serviceArea,
        pricing,
        businessLogo: businessLogoURL,
        plan,
      });

      window.location.href = "/dashboard"; // Redirect to the dashboard
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Step Navigation
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Required field checks
  const isStep1Complete = email && password && confirmPassword && phoneNumber;
  const isStep2Complete = fullName && businessName && businessType;
  const isStep3Complete = registrationNumber && services.length > 0 && serviceArea.length > 0;
  const isStep4Complete = experience && pricing;

  // File Handler for profile pic and business logo
  const handleFileUpload = (e, setter) => {
    const file = e.target.files[0];
    setter(file);
  };

  return (
    <Flex direction="column" alignItems="center" p={8}>
      <Heading as="h1" size="xl" mb={4}>
        Inscription Professionnelle
      </Heading>

      <Progress value={(step / stepsTotal) * 100} mb={6} w="full" borderRadius="md" hasStripe isAnimated colorScheme="green" />

      <Box w="full" maxW="2xl" p={8} borderWidth="2px" borderRadius="lg" boxShadow="xl" bg="gray.50">
        {step === 1 && (
          <>
            <FormControl mb={4} isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Entrez votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!/^\S+@\S+\.\S+$/.test(email) && email}
                errorBorderColor="red.300"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel>Mot de passe</FormLabel>
              <Input
                type="password"
                placeholder="Choisissez un mot de passe sécurisé"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={password.length < 6 && password}
                errorBorderColor="red.300"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel>Confirmez le mot de passe</FormLabel>
              <Input
                type="password"
                placeholder="Confirmez votre mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                isInvalid={confirmPassword !== password && confirmPassword}
                errorBorderColor="red.300"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel>Numéro de Téléphone</FormLabel>
              <PhoneInput
                country={'tn'}
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Photo de Profil</FormLabel>
              <Box display="flex" alignItems="center">
                <Button as="label" colorScheme="teal" variant="solid" cursor="pointer">
                  Téléchargez la photo
                  <Input type="file" hidden onChange={(e) => handleFileUpload(e, setProfilePic)} />
                </Button>
                {profilePic && <Image src={URL.createObjectURL(profilePic)} alt="Profile Preview" boxSize="50px" borderRadius="full" ml={4} />}
              </Box>
            </FormControl>
            <Flex justifyContent="space-between">
              <Button colorScheme="gray" onClick={prevStep}>Précédent</Button>
              <Button colorScheme="teal" onClick={nextStep} isDisabled={!isStep1Complete}>Suivant</Button>
            </Flex>
          </>
        )}

        {step === 2 && (
          <>
            <FormControl mb={4} isRequired>
              <FormLabel>Nom Complet</FormLabel>
              <Input
                type="text"
                placeholder="Entrez votre nom complet"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel>Nom de l'entreprise</FormLabel>
              <Input
                type="text"
                placeholder="Entrez le nom de votre entreprise"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel>Type d'entreprise</FormLabel>
              <Input
                type="text"
                placeholder="Ex: Plombier, Électricien, etc."
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Logo de l'entreprise</FormLabel>
              <Box display="flex" alignItems="center">
                <Button as="label" colorScheme="teal" variant="solid" cursor="pointer">
                  Téléchargez le logo
                  <Input type="file" hidden onChange={(e) => handleFileUpload(e, setBusinessLogo)} />
                </Button>
                {businessLogo && <Image src={URL.createObjectURL(businessLogo)} alt="Logo Preview" boxSize="50px" borderRadius="full" ml={4} />}
              </Box>
            </FormControl>
            <Flex justifyContent="space-between">
              <Button colorScheme="gray" onClick={prevStep}>Précédent</Button>
              <Button colorScheme="teal" onClick={nextStep} isDisabled={!isStep2Complete}>Suivant</Button>
            </Flex>
          </>
        )}

        {step === 3 && (
          <>
            <FormControl mb={4} isRequired>
              <FormLabel>Numéro de Registre d'Entreprise</FormLabel>
              <Input
                type="text"
                placeholder="Entrez votre numéro de registre"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel>Services Offerts</FormLabel>
              <Select
                isMulti
                options={serviceOptions}
                placeholder="Sélectionnez vos services"
                value={services}
                onChange={(selectedOptions) => setServices(selectedOptions)}
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel>Zone de Service</FormLabel>
              <Select
                isMulti
                options={regionOptions}
                placeholder="Sélectionnez votre zone de service"
                value={serviceArea}
                onChange={(selectedOptions) => setServiceArea(selectedOptions)}
              />
            </FormControl>
            <Flex justifyContent="space-between">
              <Button colorScheme="gray" onClick={prevStep}>Précédent</Button>
              <Button colorScheme="teal" onClick={nextStep} isDisabled={!isStep3Complete}>Suivant</Button>
            </Flex>
          </>
        )}

        {step === 4 && (
          <>
            <FormControl mb={4} isRequired>
              <FormLabel>Années d'expérience</FormLabel>
              <Input
                type="number"
                placeholder="Entrez vos années d'expérience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel>Structure de Prix (en TND)</FormLabel>
              <Textarea
                placeholder="Ex: 50 TND par heure, Prix fixe par projet"
                value={pricing}
                onChange={(e) => setPricing(e.target.value)}
              />
            </FormControl>
            <Flex justifyContent="space-between">
              <Button colorScheme="gray" onClick={prevStep}>Précédent</Button>
              <Button colorScheme="teal" onClick={nextStep} isDisabled={!isStep4Complete}>Suivant</Button>
            </Flex>
          </>
        )}

        {step === 5 && (
          <>
            <Heading as="h3" size="md" mb={4}>
              Choisissez votre Plan
            </Heading>
            <SimpleGrid columns={3} spacing={4}>
              <Card>
                <CardHeader>
                  <Heading size="md">Plan Basic</Heading>
                </CardHeader>
                <CardBody>
                  <p>Plan gratuit avec des fonctionnalités de base</p>
                </CardBody>
                <CardFooter>
                  <Radio value="basic" onChange={() => setPlan("basic")}>Choisir</Radio>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <Heading size="md">Plan Pro</Heading>
                </CardHeader>
                <CardBody>
                  <p>Fonctionnalités avancées pour professionnels</p>
                </CardBody>
                <CardFooter>
                  <Radio value="pro" onChange={() => setPlan("pro")}>Choisir</Radio>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <Heading size="md">Plan Premium</Heading>
                </CardHeader>
                <CardBody>
                  <p>Accès complet à toutes les fonctionnalités</p>
                </CardBody>
                <CardFooter>
                  <Radio value="premium" onChange={() => setPlan("premium")}>Choisir</Radio>
                </CardFooter>
              </Card>
            </SimpleGrid>
            <Flex justifyContent="space-between">
              <Button colorScheme="gray" onClick={prevStep}>Précédent</Button>
              <Button colorScheme="teal" onClick={handleRegister}>
                Terminer et S'inscrire
              </Button>
            </Flex>
          </>
        )}
      </Box>
    </Flex>
  );
}
