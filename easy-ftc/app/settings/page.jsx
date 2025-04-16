import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { FormMessage, Message } from "@/components/form-message";
import { updatePasswordAction, updateUsernameAction, updateDisplayNameAction } from "@/app/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function SettingsPage(props) {
  const supabase = await createClient();
  const searchParams = await props.searchParams;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const currentUsername = user.user_metadata?.username || "Not Set";
  const currentDisplayName = user.user_metadata?.display_name || "Not Set";

  return (
    <div className="flex-1 w-full flex flex-col gap-8 p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Settings</h1>

      {/* Profile Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Update your username and display name.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8 md:grid-cols-2">
          {/* Update Username Form */}
          <form action={updateUsernameAction}>
            <h3 className="text-lg font-medium mb-2">Username</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Current: <span className="font-medium text-foreground">{currentUsername}</span>
            </p>
            <div className="flex flex-col gap-3">
              <div>
                <Label htmlFor="username">New Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  minLength={3}
                  className="mt-1"
                  defaultValue={currentUsername === "Not Set" ? "" : currentUsername}
                />
                <p className="text-xs text-muted-foreground mt-1">3+ characters. Allowed: letters, numbers, underscores.</p>
              </div>
              <FormMessage message={searchParams} formIdentifier="usernameForm" />
              <SubmitButton
                formAction={updateUsernameAction}
                pendingText="Updating Username..."
                className="mt-1 w-full sm:w-auto"
                size="sm"
              >
                Update Username
              </SubmitButton>
            </div>
          </form>
          <br />
          {/* Update Display Name Form */}
          <form action={updateDisplayNameAction}>
            <h3 className="text-lg font-medium mb-2">Display Name</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Current: <span className="font-medium text-foreground">{currentDisplayName}</span>
            </p>
            <div className="flex flex-col gap-3">
              <div>
                <Label htmlFor="displayName">New Display Name</Label>
                <Input
                  id="displayName"
                  name="displayName"
                  type="text"
                  required
                  minLength={2}
                  className="mt-1"
                  defaultValue={currentDisplayName === "Not Set" ? "" : currentDisplayName}
                />
                <p className="text-xs text-muted-foreground mt-1">2+ characters. How your name will appear publicly.</p>
              </div>
              <FormMessage message={searchParams} formIdentifier="displayNameForm" />
              <SubmitButton
                formAction={updateDisplayNameAction}
                pendingText="Updating Display Name..."
                className="mt-1 w-full sm:w-auto"
                size="sm"
              >
                Update Display Name
              </SubmitButton>
            </div>
          </form>
        </CardContent>
        {/* CardFooter can be added if needed */}
      </Card>

      {/* Password Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle>Password Settings</CardTitle>
          <CardDescription>Update your account password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updatePasswordAction}>
            <div className="flex flex-col gap-4 max-w-sm"> {/* Limit width */}
              <div>
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  minLength={6}
                  className="mt-1"
                />
              </div>
              <FormMessage message={searchParams} formIdentifier="passwordForm" />
              <SubmitButton
                formAction={updatePasswordAction}
                pendingText="Updating Password..."
                className="mt-2 w-full sm:w-auto" /* Adjusted margin */
                size="sm" /* Consistent size */
              >
                Update Password
              </SubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Add other settings sections as Cards here later */}
    </div>
  );
}
