import LessonLayout from "@/components/LessonLayout";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import CodeFillIn from "@/components/CodeFillIn";

export const metadata = {
  title: "Motor Control Fill in the Code | EasyFTC",
};

export default function MotorControlCodeFillIn() {
  const lessonPoints = 60;
  const codeTemplate = `// Set up two DcMotors for a tank drive robot
DcMotor leftMotor;
DcMotor rightMotor;

@Override
public void init() {
    leftMotor = hardwareMap.get(DcMotor.class, ____);
    rightMotor = hardwareMap.get(DcMotor.class, ____);
    leftMotor.setDirection(____);
    rightMotor.setDirection(____);
    leftMotor.setZeroPowerBehavior(____);
    rightMotor.setZeroPowerBehavior(____);
}

@Override
public void loop() {
    double leftPower = -gamepad1.left_stick_y;
    double rightPower = -gamepad1.right_stick_y;
    leftMotor.setPower(____);
    rightMotor.setPower(____);
    // Add telemetry for debugging
    telemetry.addData("Left Power", ____);
    telemetry.addData("Right Power", ____);
    telemetry.update();
}`;
  const options = [
    { id: 'zpb2', label: 'DcMotor.ZeroPowerBehavior.BRAKE' },
    { id: 'lp2', label: 'leftPower' },
    { id: 'dir_rev', label: 'DcMotor.Direction.REVERSE' },
    { id: 'right_drive', label: '"right_drive"' },
    { id: 'zpb1', label: 'DcMotor.ZeroPowerBehavior.BRAKE' },
    { id: 'lp1', label: 'leftPower' },
    { id: 'dir_fwd', label: 'DcMotor.Direction.FORWARD' },
    { id: 'rp2', label: 'rightPower' },
    { id: 'left_drive', label: '"left_drive"' },
    { id: 'rp1', label: 'rightPower' },
  ];
  const answers = [
    'left_drive',
    'right_drive',
    'dir_fwd',
    'dir_rev',
    'zpb1',
    'zpb2',
    'lp1',
    'rp1',
    'lp2',
    'rp2',
  ];

  return (
    <LessonLayout currentLessonPoints={lessonPoints}>
      <div>
        <h1>Motor Control Fill in the Code</h1>
        <p className="mb-6">
          Practice filling in the missing pieces of code to set up and control a motor in FTC. Drag the correct code snippets into the blanks below.
        </p>
        <CodeFillIn
          codeTemplate={codeTemplate}
          options={options}
          answers={answers}
          title="Fill in the missing code for motor control"
        />
        <div className="mt-10 flex justify-center">
          <LessonCompleteButton lessonPoints={lessonPoints} />
        </div>
      </div>
    </LessonLayout>
  );
} 