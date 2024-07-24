/** @format */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Check, Copy, Eye, EyeOff } from "lucide-react";
import { useUserStore } from "@/global-store/store";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import useApi from "@/helpers/useApi";

const chartData = [
  { month: "January", feedback: 186 },
  { month: "February", feedback: 305 },
  { month: "March", feedback: 237 },
  { month: "April", feedback: 73 },
  { month: "May", feedback: 209 },
  { month: "June", feedback: 214 },
]

const chartConfig = {
  feedback: {
    label: "feedback",
    theme: {
      light: "#cfcfcf",
      dark: "#1b1b1b",
    },
  }
} satisfies ChartConfig

const Settings = () => {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const [isCopied, setIsCopied] = useState("false")
  const { user } = useUserStore()
  const { toast } = useToast()
  const params = useSearchParams()
  const tabParam = params?.get("tab")
  const callApi = useApi()

  useEffect(() => {
    setName(user?.name.toLowerCase() ?? "")
  }, [user])

  const saveProfile = async () => {
    try {
      if (!name) {
        toast({
          title: "oops! name can't be empty!",
          description: "fill up the name and try again!!",
        })
      }
      setLoading(true)
      const res = await callApi("/me", "PUT", { name })
      console.log("profile updated! ", res)

      if (res.data.success) {
        toast({
          title: "profile updated!",
          description: res.data.message.toLowerCase(),
        })
      } else {
        toast({
          title: "oops! couldn't update!",
          description: res.data.message.toLowerCase(),
        })
      }
    } catch (error: any) {
      toast({
        title: "oops! couldn't update!",
        description: error.response.data.message.toLowerCase() || "refresh and try again!",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(type)
      setTimeout(() => setIsCopied("false"), 3000)
    } catch (error) {
      console.error("error copying text: ", error)
    }
  }

  return (
    <div className="flex flex-col w-full h-full dark:bg-dark-secondary dark:text-white px-10">
      <div className="flex gap-4 justify-between items-center">
        <h1 className="pt-1 pb-3 text-xl font-semibold">settings</h1>
      </div>

      <Tabs defaultValue={tabParam ?? "usage"} className="w-full">
        <TabsList className="grid w-1/3 grid-cols-3 bg-transparent">
          <TabsTrigger value="usage">usage</TabsTrigger>
          <TabsTrigger value="secrets">secrets</TabsTrigger>
          <TabsTrigger value="profile">account</TabsTrigger>
        </TabsList>

        <TabsContent value="usage" className="relative">
          <ChartContainer config={chartConfig} className="w-2/3 h-2/3 opacity-45">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="feedback" fill="var(--color-feedback)" radius={4} />
            </BarChart>
          </ChartContainer>

          <div className="absolute top-[40%] left-[25%] text-lg">usage chart & metrics coming soon...</div>
        </TabsContent>

        <TabsContent value="secrets">
          <Card className="dark:bg-dark-primary">
            <CardHeader>
              <CardTitle>client secrets</CardTitle>
              <CardDescription>
                read the client id and client secret here to start feedback apis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="clientId">client id</Label>
                <div className="flex gap-1 items-center">
                  <Input id="clientId" defaultValue={user?.userId ?? ""} className="w-1/2" readOnly disabled />
                  <Button onClick={() => handleCopy(user?.userId ?? "", "clientId")} className="h-full px-2 bg-light-primary hover:bg-light-secondary dark:bg-dark-primary dark:hover:bg-dark-secondary transition-all">
                    {isCopied === "clientId" ? <Check className="text-black dark:text-white" /> : <Copy className="text-black dark:text-white" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="clientSecret">client secret</Label>
                <div className="flex gap-1 items-center">
                  <Input id="clientSecret" value={showSecret ? user?.clientSecret ?? "" : "$2a$**************"} className="w-1/2" readOnly disabled />
                  <Button onClick={() => setShowSecret(!showSecret)} className="h-full px-2 bg-light-primary hover:bg-light-secondary dark:bg-dark-primary dark:hover:bg-dark-secondary transition-all">
                    {showSecret ? <Eye className="text-black dark:text-white" /> : <EyeOff className="text-black dark:text-white" />}
                  </Button>
                  <Button onClick={() => handleCopy(user?.clientSecret ?? "", "clientSecret")} className="h-full px-2 bg-light-primary hover:bg-light-secondary dark:bg-dark-primary dark:hover:bg-dark-secondary transition-all">
                    {isCopied === "clientSecret" ? <Check className="text-black dark:text-white" /> : <Copy className="text-black dark:text-white" />}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-sm opacity-70">if your client secret is compromised and needs to be changed, contact our support</div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card className="dark:bg-dark-primary">
            <CardHeader>
              <CardTitle>edit profile</CardTitle>
              <CardDescription>
                make changes to your account here. click save when you&apos;re done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">name</Label>
                <Input id="name" defaultValue="name eg:- mayank" value={name} onChange={(e) => setName(e.target.value)} className="w-1/2" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">email</Label>
                <Input id="email" defaultValue={user?.email ?? ""} className="w-1/2" readOnly disabled />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveProfile} disabled={loading} className="bg-accent-link hover:bg-accent-buttonhover transition-all py-1 px-4 rounded-full text-white">save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* change password (later) */}
        {/* <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent> */}
      </Tabs>

      {/* <div className="flex flex-col shadow-lg my-4 p-4 border border-light-primary dark:border-light-primary rounded-sm">
        <div className="flex">
          <p>profile settings:</p>
        </div>
        <div className="flex flex-col my-2">
          <form className="flex flex-col justify-center">
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] w-full md:w-96 text-md dark:text-white outline-none hover:outline focus:outline my-2"
              required
            />
            <input
              type="email"
              placeholder="email"
              value={name}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] w-full md:w-96 text-md dark:text-white outline-none hover:outline focus:outline my-2"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-accent-link hover:bg-accent-buttonhover my-2 px-4 p-1 rounded-full w-fit md:w-48 text-white transition-all"
              onClick={saveHandler}
            >
              save
            </button>
          </form>
        </div>
      </div> */}

      {/* <div className="flex flex-col shadow-lg my-4 p-4 border border-light-primary dark:border-light-primary rounded-sm">
        <div className="flex">
          <p>account settings:</p>
        </div>
        <div className="flex flex-col my-2">
          <form className="flex flex-col justify-center">
            <input
              type="password"
              placeholder="enter your password to delete your account"
              value={name}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-light-primary dark:bg-accent-darkinput px-4 py-1 border border-l-2 border-l-black dark:border-l-[#ffffff] w-full md:w-96 text-md dark:text-white outline-none hover:outline focus:outline my-2"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#FF4040] hover:bg-accent-buttonhover my-2 px-4 p-1 rounded-full w-fit md:w-48 text-white transition-all"
              onClick={deleteAccountHandler}
            >
              delete
            </button>
          </form>
        </div>
      </div> */}
    </div >
  );
};

export default Settings;
