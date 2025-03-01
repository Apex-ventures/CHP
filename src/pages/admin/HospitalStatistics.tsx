
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Treemap,
} from 'recharts';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

const HospitalStatistics = () => {
  const [timeRange, setTimeRange] = useState("year");
  const [department, setDepartment] = useState("all");

  // Mock data for disease statistics
  const diseaseData = [
    { name: 'Hypertension', count: 468, change: '+12%', department: 'Cardiology' },
    { name: 'Type 2 Diabetes', count: 362, change: '+8%', department: 'Endocrinology' },
    { name: 'COVID-19', count: 289, change: '-22%', department: 'Infectious Disease' },
    { name: 'Asthma', count: 256, change: '+5%', department: 'Pulmonology' },
    { name: 'Depression', count: 243, change: '+18%', department: 'Psychiatry' },
    { name: 'Osteoarthritis', count: 226, change: '+3%', department: 'Orthopedics' },
    { name: 'COPD', count: 198, change: '+2%', department: 'Pulmonology' },
    { name: 'Breast Cancer', count: 187, change: '+7%', department: 'Oncology' },
    { name: 'Heart Failure', count: 176, change: '+4%', department: 'Cardiology' },
    { name: 'Stroke', count: 165, change: '-3%', department: 'Neurology' },
  ];

  // Mock data for disease trends over time
  const diseaseTrendData = [
    { month: 'Jan', Hypertension: 38, Diabetes: 30, COVID: 42, Asthma: 20 },
    { month: 'Feb', Hypertension: 40, Diabetes: 32, COVID: 36, Asthma: 22 },
    { month: 'Mar', Hypertension: 45, Diabetes: 34, COVID: 31, Asthma: 24 },
    { month: 'Apr', Hypertension: 48, Diabetes: 36, COVID: 28, Asthma: 25 },
    { month: 'May', Hypertension: 52, Diabetes: 37, COVID: 26, Asthma: 26 },
    { month: 'Jun', Hypertension: 54, Diabetes: 39, COVID: 24, Asthma: 28 },
    { month: 'Jul', Hypertension: 58, Diabetes: 42, COVID: 22, Asthma: 29 },
    { month: 'Aug', Hypertension: 59, Diabetes: 43, COVID: 20, Asthma: 28 },
    { month: 'Sep', Hypertension: 60, Diabetes: 44, COVID: 19, Asthma: 26 },
    { month: 'Oct', Hypertension: 62, Diabetes: 45, COVID: 18, Asthma: 24 },
    { month: 'Nov', Hypertension: 64, Diabetes: 46, COVID: 18, Asthma: 22 },
    { month: 'Dec', Hypertension: 65, Diabetes: 48, COVID: 17, Asthma: 21 },
  ];

  // Mock data for patient demographics
  const ageDistributionData = [
    { name: '0-12', value: 8 },
    { name: '13-18', value: 5 },
    { name: '19-35', value: 15 },
    { name: '36-50', value: 22 },
    { name: '51-65', value: 28 },
    { name: '65+', value: 22 },
  ];

  // Mock data for hospitalization reasons
  const hospitalizationData = [
    { name: 'Cardiovascular', value: 28 },
    { name: 'Respiratory', value: 18 },
    { name: 'Digestive', value: 12 },
    { name: 'Infectious', value: 10 },
    { name: 'Neurological', value: 8 },
    { name: 'Orthopedic', value: 7 },
    { name: 'Cancer-related', value: 6 },
    { name: 'Others', value: 11 },
  ];

  // Mock data for procedure effectiveness
  const procedureData = [
    { name: 'Cardiac Catheterization', success: 92, complications: 8 },
    { name: 'Hip Replacement', success: 94, complications: 6 },
    { name: 'Appendectomy', success: 97, complications: 3 },
    { name: 'Spinal Fusion', success: 88, complications: 12 },
    { name: 'Colonoscopy', success: 99, complications: 1 },
    { name: 'CABG', success: 91, complications: 9 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#ffc658', '#8dd1e1'];

  return (
    <div className="container p-6 mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Hospital Statistics</h1>
          <p className="text-muted-foreground">Comprehensive analysis of hospital performance and disease trends</p>
        </div>
        <div className="flex gap-4">
          <div className="w-48">
            <Label htmlFor="timeRange">Time Period</Label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger id="timeRange">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
                <SelectItem value="5year">Last 5 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-48">
            <Label htmlFor="department">Department</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger id="department">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="neurology">Neurology</SelectItem>
                <SelectItem value="orthopedics">Orthopedics</SelectItem>
                <SelectItem value="oncology">Oncology</SelectItem>
                <SelectItem value="pediatrics">Pediatrics</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="disease-trends" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="disease-trends">Disease Trends</TabsTrigger>
          <TabsTrigger value="patient-demographics">Patient Demographics</TabsTrigger>
          <TabsTrigger value="procedure-metrics">Procedure Metrics</TabsTrigger>
          <TabsTrigger value="hospitalization">Hospitalization Data</TabsTrigger>
        </TabsList>

        <TabsContent value="disease-trends">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Top 10 Most Frequent Diseases</CardTitle>
                <CardDescription>Distribution of diagnoses in the last {timeRange}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={diseaseData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#8884d8" name="Number of Cases" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Disease Distribution</CardTitle>
                <CardDescription>By department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <Treemap
                      data={diseaseData}
                      dataKey="count"
                      ratio={4/3}
                      stroke="#fff"
                      fill="#8884d8"
                      nameKey="name"
                    >
                      <Tooltip formatter={(value) => `${value} cases`} />
                    </Treemap>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Disease Trends Over Time</CardTitle>
              <CardDescription>Monthly tracking of top diseases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={diseaseTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Hypertension" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
                    <Line type="monotone" dataKey="Diabetes" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="COVID" stroke="#ffc658" strokeWidth={2} />
                    <Line type="monotone" dataKey="Asthma" stroke="#ff8042" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Detailed Disease Statistics</CardTitle>
              <CardDescription>Analysis of disease prevalence and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Disease</TableHead>
                    <TableHead>Cases</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>YoY Change</TableHead>
                    <TableHead>Avg. Recovery Time</TableHead>
                    <TableHead>Readmission Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {diseaseData.slice(0, 6).map((disease, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{disease.name}</TableCell>
                      <TableCell>{disease.count}</TableCell>
                      <TableCell>{disease.department}</TableCell>
                      <TableCell className={disease.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                        {disease.change}
                      </TableCell>
                      <TableCell>{Math.floor(Math.random() * 30) + 3} days</TableCell>
                      <TableCell>{Math.floor(Math.random() * 20) + 1}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button variant="outline" className="mt-4">View Full Report</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patient-demographics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Age Distribution</CardTitle>
                <CardDescription>Breakdown by age group</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ageDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {ageDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Additional demographic cards would go here */}
          </div>
        </TabsContent>

        <TabsContent value="procedure-metrics">
          <Card>
            <CardHeader>
              <CardTitle>Procedure Success Rates</CardTitle>
              <CardDescription>Analysis of medical procedures and their outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={procedureData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="success" stackId="a" fill="#82ca9d" name="Success Rate (%)" />
                    <Bar dataKey="complications" stackId="a" fill="#ff8042" name="Complication Rate (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hospitalization">
          <Card>
            <CardHeader>
              <CardTitle>Reasons for Hospitalization</CardTitle>
              <CardDescription>Primary causes for inpatient admissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={hospitalizationData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {hospitalizationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2 mt-8">
        <Button variant="outline">Export as PDF</Button>
        <Button variant="outline">Export as CSV</Button>
        <Button>Generate Full Report</Button>
      </div>
    </div>
  );
};

export default HospitalStatistics;
